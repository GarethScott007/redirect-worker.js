// domain-redirects — canonical redirector (safe + SEO-friendly)
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Never intercept Pages preview or *.pages.dev
    if (url.hostname.endsWith(".pages.dev")) {
      return fetch(request);
    }

    // === Canonical host (single source of truth) ===
    const CANON = "purpleflight.com";

    // Normalize the host to compare apples with apples
    const hostLower = url.hostname.toLowerCase();
    const bareHost  = hostLower.replace(/^www\./, "");

    // === Domains that must 301 to the canonical apex ===
    // Put ONLY non-canonical domains here (bare form, no "www.")
    const REDIRECT_HOSTS = new Set([
      "flypurpleflights.com",
      "getpurpleflights.com",
      "purpleflightclub.com",
      "purpleflightsapp.com",
      "purpleflights.co.uk",
      "purpleflights.mobi",
      "purpleflights.net",
      "showmeflights.com",
      "thaipurpleflights.com",

      // strongly recommended extras:
      "purpleflights.com",     // plural → singular
      "purpleflight.co.uk"     // .co.uk → .com
    ]);

    // www → apex on the canonical host
    if (hostLower === `www.${CANON}`) {
      url.hostname = CANON;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Any non-canonical domain? 301 to canonical (preserve path + query)
    if (REDIRECT_HOSTS.has(bareHost)) {
      url.hostname = CANON;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Otherwise (including the canonical host), pass through to your Pages app
    return fetch(request);
  },
};
