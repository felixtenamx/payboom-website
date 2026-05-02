/*
  Vendor shim for three.module.js
  ---------------------------------------------------------
  This file re-exports the official `three.module.js` from CDN
  as a local module entrypoint. Replace this file with a
  full local copy of `three.module.js` to eliminate CDN usage
  and allow tightening CSP (remove CDN origin from script-src).

  To vendor properly: download the upstream file and save it
  here as `three.module.js` (same filename). After that you can
  remove the CDN fallback and update CSP to only allow 'self'.
*/

// Fallback re-export from CDN. Keeps behavior identical while
// providing an easy local path to swap with a full local copy.
export * from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
export { default } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
