// domain-redirects — canonical redirector (safe + SEO-friendly)
export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Don't touch Cloudflare Pages preview or *.pages.dev hosts
    if (url.hostname.endsWith(".pages.dev")) {
      return fetch(request);
    }

    // Single canonical host for your site
    const CANON = "purpleflight.com";

    // Normalize hostname for comparisons
    const hostLower = url.hostname.toLowerCase();
    const bareHost  = hostLower.replace(/^www\./, "");

    // Non-canonical domains that must 301 to the canonical apex
    // (bare form, no "www.")
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
      "purpleflights.com",
      "purpleflight.co.uk",
    ]);

    // www -> apex on the canonical host
    if (hostLower === `www.${CANON}`) {
      url.hostname = CANON;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Any listed non-canonical domain -> canonical (keep path + query)
    if (REDIRECT_HOSTS.has(bareHost)) {
      url.hostname = CANON;
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    // Otherwise pass through (serve your Pages app or whatever origin)
    return fetch(request);
  },
};
