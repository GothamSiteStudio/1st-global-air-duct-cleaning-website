(function () {
  'use strict';
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem('cookieConsent')) return;

  var css = '\
.cookie-banner{position:fixed;bottom:0;left:0;right:0;background:#1F2937;color:#fff;padding:14px 20px;z-index:9999;box-shadow:0 -4px 12px rgba(0,0,0,.18);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.5}\
.cookie-banner p{margin:0;flex:1;min-width:260px;max-width:680px}\
.cookie-banner a{color:#93C5FD;text-decoration:underline}\
.cookie-banner button{background:#0A4D8C;color:#fff;border:none;padding:10px 22px;border-radius:6px;font-weight:600;cursor:pointer;font-family:inherit;font-size:14px;transition:background .15s}\
.cookie-banner button:hover{background:#073A6B}\
.cookie-banner button:focus-visible{outline:2px solid #93C5FD;outline-offset:2px}\
@media(max-width:600px){.cookie-banner{padding:12px 14px;font-size:13px}.cookie-banner button{padding:9px 18px;font-size:13px}}\
';

  function inject() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<p>This site uses cookies for analytics to improve your experience. See our <a href="/privacy.html">Privacy Policy</a>.</p>' +
      '<button type="button" class="cookie-accept">Got it</button>';

    document.body.appendChild(banner);
    banner.querySelector('.cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
      banner.remove();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
