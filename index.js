export default {
  async fetch(request) {
    const primaryDomain = 'purpleflight.com';
    
    const redirectDomains = [
      'flypurpleflights.com',
      'getpurpleflights.com',
      'purpleflightclub.com',
      'purpleflightsapp.com',
      'purpleflights.co.uk',
      'purpleflights.mobi',
      'purpleflights.net',
      'showmeflights.com',
      'thaipurpleflights.com'
    ];

    const url = new URL(request.url);
    const host = url.hostname.replace(/^www\./, '').toLowerCase();
    
    if (redirectDomains.includes(host)) {
      return Response.redirect(`https://${primaryDomain}${url.pathname}${url.search}`, 301);
    }
    
    return fetch(request);
  }
}
