/* SimSlate marketing pages — first-party page-view beacon + waitlist capture.
   No cookies, no PII, honors Do Not Track, skipped on localhost. Writes go to
   Supabase tables that are INSERT-only for this publishable key (RLS). */
(function () {
  var SUPA = "https://fwobzbfdqzujxtxjrnjm.supabase.co";
  var KEY = "sb_publishable_h5WsD2mO9hj8ggBz0djj_A_LxHflrjL";

  function post(table, row, extraHeaders) {
    // publishable (sb_publishable_) keys go in apikey ONLY — they are not JWTs,
    // and sending one as a Bearer token 401s at the gateway
    var headers = { "content-type": "application/json", apikey: KEY };
    if (extraHeaders) Object.keys(extraHeaders).forEach(function (k) { headers[k] = extraHeaders[k]; });
    return fetch(SUPA + "/rest/v1/" + table, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(row),
      keepalive: true,
    });
  }

  /* ---- page-view beacon ---- */
  try {
    var dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
    var local = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname);
    if (!dnt && !local) {
      var sid = sessionStorage.getItem("fs_sid");
      if (!sid) {
        sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("fs_sid", sid);
      }
      var q = new URLSearchParams(location.search);
      post("page_views", {
        path: location.pathname.slice(0, 200),
        referrer: document.referrer ? document.referrer.slice(0, 500) : null,
        utm_source: q.get("utm_source"),
        utm_medium: q.get("utm_medium"),
        utm_campaign: q.get("utm_campaign"),
        session_id: sid,
      }).catch(function () {});
    }
  } catch (e) { /* analytics must never break the page */ }

  /* ---- waitlist forms: any <form data-waitlist> with an email input ---- */
  function wire(form) {
    var input = form.querySelector('input[type="email"]');
    var btn = form.querySelector('button[type="submit"], button');
    var msg = form.querySelector(".wl-msg");
    if (!input || !btn) return;
    function say(text, ok) {
      if (msg) {
        msg.textContent = text;
        msg.style.color = ok ? "var(--lev, #2de3a7)" : "var(--chalk, #f0b23e)";
      }
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = (input.value || "").trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) { say("Enter a valid email.", false); return; }
      btn.disabled = true;
      post("waitlist", { email: email, source: form.getAttribute("data-waitlist") || location.pathname })
        .then(function (r) {
          if (r.ok) { say("You're in. Field Reports start with the season.", true); form.reset(); }
          else if (r.status === 409) { say("You're already on the list.", true); form.reset(); }
          else { say("Couldn't sign you up — try again in a minute.", false); }
        })
        .catch(function () { say("Couldn't sign you up — try again in a minute.", false); })
        .finally(function () { btn.disabled = false; });
    });
  }
  var forms = document.querySelectorAll("form[data-waitlist]");
  for (var i = 0; i < forms.length; i++) wire(forms[i]);

  // nav Tools dropdown: <details> doesn't close on its own — collapse it on
  // any click outside it (and on Escape)
  function closeNavDd(except) {
    var dds = document.querySelectorAll("details.nav-dd[open]");
    for (var j = 0; j < dds.length; j++) if (dds[j] !== except) dds[j].removeAttribute("open");
  }
  document.addEventListener("click", function (e) {
    closeNavDd(e.target.closest ? e.target.closest("details.nav-dd") : null);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNavDd(null);
  });
})();
