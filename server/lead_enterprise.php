<?php
// server/lead_enterprise.php
// Verify reCAPTCHA Enterprise token using Google Cloud client, rate-limit, and forward leads to formsubmit.co

declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use Google\Cloud\RecaptchaEnterprise\V1\RecaptchaEnterpriseServiceClient;
use Google\Cloud\RecaptchaEnterprise\V1\Event;
use Google\Cloud\RecaptchaEnterprise\V1\Assessment;
use Google\Cloud\RecaptchaEnterprise\V1\CreateAssessmentRequest;

header('Content-Type: application/json; charset=utf-8');

$FORMSUBMIT_URL = 'https://formsubmit.co/ajax/comercial@payboom.io';
$RATE_LIMIT_FILE = __DIR__ . '/ratelimit.json';
$RATE_LIMIT_MAX = intval(getenv('RATE_LIMIT_MAX') ?: 60);
$RATE_LIMIT_WINDOW = intval(getenv('RATE_LIMIT_WINDOW') ?: 3600);
$RECAPTCHA_PROJECT = getenv('RECAPTCHA_PROJECT') ?: 'green-antonym-495318-v8';

function send_json($code, $data) {
  http_response_code($code);
  echo json_encode($data);
  exit;
}

$raw = file_get_contents('php://input');
if (!$raw) send_json(400, ['ok' => false, 'error' => 'empty_body']);
$body = json_decode($raw, true);
if (!is_array($body)) { parse_str($raw, $body); }

$token = trim((string)($body['g-recaptcha-response'] ?? ''));
if ($token === '') send_json(400, ['ok' => false, 'error' => 'missing_token']);

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

function rate_limit_allow($ip, $file, $max, $window) {
  if (!file_exists($file)) file_put_contents($file, json_encode(new stdClass()));
  $fp = fopen($file, 'c+'); if (!$fp) return false;
  flock($fp, LOCK_EX);
  $contents = stream_get_contents($fp);
  $data = $contents ? json_decode($contents, true) : [];
  if (!is_array($data)) $data = [];
  $now = time(); if (!isset($data[$ip])) $data[$ip] = [];
  $data[$ip] = array_values(array_filter($data[$ip], function($ts) use ($now, $window) { return ($now - $ts) < $window; }));
  if (count($data[$ip]) >= $max) {
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    return false;
  }
  $data[$ip][] = $now;
  ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data)); fflush($fp); flock($fp, LOCK_UN); fclose($fp);
  return true;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!rate_limit_allow($ip, $RATE_LIMIT_FILE, $RATE_LIMIT_MAX, $RATE_LIMIT_WINDOW)) {
  send_json(429, ['ok' => false, 'error' => 'rate_limited']);
}

// Create assessment using Google client
try {
  $client = new RecaptchaEnterpriseServiceClient();
  $parent = $client->projectName($RECAPTCHA_PROJECT);
  $event = (new Event())->setSiteKey($body['site_key'] ?? ($body['siteKey'] ?? ''))->setToken($token);
  $assessment = (new Assessment())->setEvent($event);
  $req = (new CreateAssessmentRequest())->setParent($parent)->setAssessment($assessment);
  $response = $client->createAssessment($req);

  $tp = $response->getTokenProperties();
  if ($tp->getValid() === false) {
    file_put_contents(__DIR__ . '/recaptcha.log', date('c') . " INVALID TOKEN: " . json_encode([ 'reason' => $tp->getInvalidReason(), 'action' => $tp->getAction() ]) . "\n", FILE_APPEND | LOCK_EX);
    send_json(403, ['ok' => false, 'error' => 'token_invalid', 'reason' => $tp->getInvalidReason()]);
  }

  $score = $response->getRiskAnalysis()->getScore() ?? 0.0;
  $action = $tp->getAction() ?? '';
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
  send_json(200, ['ok' => true, 'forward' => $fjson, 'score' => $score]);

} catch (Throwable $e) {
  file_put_contents(__DIR__ . '/recaptcha.log', date('c') . " EXC: " . $e->getMessage() . "\n", FILE_APPEND | LOCK_EX);
  send_json(500, ['ok' => false, 'error' => 'server_error', 'detail' => $e->getMessage()]);
}

?>
