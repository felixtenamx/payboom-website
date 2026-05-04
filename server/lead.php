<?php
// server/lead.php
// Simple PHP endpoint to verify reCAPTCHA v3 tokens server-side,
// apply basic rate-limiting per IP, and forward validated leads to formsubmit.co

declare(strict_types=1);

// Configuration
$FORMSUBMIT_URL = 'https://formsubmit.co/ajax/comercial@payboom.io';
$RATE_LIMIT_FILE = __DIR__ . '/ratelimit.json';
$RATE_LIMIT_MAX = intval(getenv('RATE_LIMIT_MAX') ?: 60); // submissions per window
$RATE_LIMIT_WINDOW = intval(getenv('RATE_LIMIT_WINDOW') ?: 3600); // seconds
$RECAPTCHA_SECRET = getenv('RECAPTCHA_SECRET') ?: null;

header('Content-Type: application/json; charset=utf-8');

function send_json($code, $data) {
  http_response_code($code);
  echo json_encode($data);
  exit;
}

// Read incoming JSON
$raw = file_get_contents('php://input');
if (!$raw) {
  send_json(400, ['ok' => false, 'error' => 'empty_body']);
}
$body = json_decode($raw, true);
if (!is_array($body)) {
  // try form-encoded fallback
  parse_str($raw, $body);
}

$token = trim((string)($body['g-recaptcha-response'] ?? ''));
if ($token === '') {
  send_json(400, ['ok' => false, 'error' => 'missing_token']);
}

// Basic input sanitize helpers
function s($v, $max) { return mb_substr(trim((string)$v), 0, $max); }
$payload = [
  '_subject' => 'NUEVO LEAD POTENCIAL',
  '_cc' => 'sandro.haro@payboom.io',
  '_template' => 'table',
  'Nombre' => s($body['Nombre'] ?? $body['nombre'] ?? '', 100),
  'Correo' => s($body['Correo'] ?? $body['correo'] ?? '', 254),
  'Telefono' => s($body['Telefono'] ?? $body['telefono'] ?? '', 32),
  'Mensaje' => s($body['Mensaje'] ?? $body['mensaje'] ?? '', 2000),
];

// Rate limit per IP using a single JSON file with flock
function rate_limit_allow($ip, $file, $max, $window) {
  $data = [];
  if (!file_exists($file)) { file_put_contents($file, json_encode(new stdClass())); }
  $fp = fopen($file, 'c+');
  if (!$fp) return false;
  flock($fp, LOCK_EX);
  $contents = stream_get_contents($fp);
  $data = $contents ? json_decode($contents, true) : [];
  if (!is_array($data)) $data = [];
  $now = time();
  if (!isset($data[$ip])) $data[$ip] = [];
  // prune
  $data[$ip] = array_values(array_filter($data[$ip], function($ts) use ($now, $window) { return ($now - $ts) < $window; }));
  if (count($data[$ip]) >= $max) {
    // write back pruned and release
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    return false;
  }
  // allow and record
  $data[$ip][] = $now;
  ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
  return true;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!rate_limit_allow($ip, $RATE_LIMIT_FILE, $RATE_LIMIT_MAX, $RATE_LIMIT_WINDOW)) {
  send_json(429, ['ok' => false, 'error' => 'rate_limited']);
}

// Verify reCAPTCHA via Google siteverify (v3)
if (!$RECAPTCHA_SECRET) {
  send_json(500, ['ok' => false, 'error' => 'server_misconfigured', 'detail' => 'RECAPTCHA_SECRET missing (set env var)']);
}

$verify = curl_init('https://www.google.com/recaptcha/api/siteverify');
curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
curl_setopt($verify, CURLOPT_POST, true);
curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query([
  'secret' => $RECAPTCHA_SECRET,
  'response' => $token,
  'remoteip' => $ip,
]));
$resp = curl_exec($verify);
$err = curl_error($verify);
curl_close($verify);
if ($resp === false) {
  send_json(502, ['ok' => false, 'error' => 'recaptcha_unavailable', 'detail' => $err]);
}
$json = json_decode($resp, true);
if (!is_array($json) || empty($json['success'])) {
  // log
  file_put_contents(__DIR__ . '/recaptcha.log', date('c') . " INVALID: " . json_encode($json) . "\n", FILE_APPEND | LOCK_EX);
  send_json(403, ['ok' => false, 'error' => 'recaptcha_failed', 'detail' => $json]);
}

$score = isset($json['score']) ? floatval($json['score']) : 0.0;
$action = $json['action'] ?? '';
$threshold = floatval(getenv('RECAPTCHA_THRESHOLD') ?: 0.5);
file_put_contents(__DIR__ . '/recaptcha.log', date('c') . " SCORE: {$score} ACTION: {$action} IP: {$ip}\n", FILE_APPEND | LOCK_EX);
if ($score < $threshold) {
  send_json(403, ['ok' => false, 'error' => 'low_score', 'score' => $score]);
}

// Forward to formsubmit.co
$ch = curl_init($FORMSUBMIT_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
$forwardResp = curl_exec($ch);
$forwardErr = curl_error($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
if ($forwardResp === false) {
  send_json(502, ['ok' => false, 'error' => 'forward_failed', 'detail' => $forwardErr]);
}
$fjson = json_decode($forwardResp, true);
// return formsubmit response
send_json(200, ['ok' => true, 'forward' => $fjson, 'score' => $score]);

?>
