const https = require('https');
const http = require('http');

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const mod = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    };
    mod.get(url, options, (res) => {
      console.log('Status:', res.statusCode, 'URL:', url);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        const next = loc.startsWith('http') ? loc : new URL(loc, url).href;
        console.log('Redirect to:', next);
        if (!next.includes('public_profiles') && !next.includes('profile')) {
          return reject(new Error('Redirected to non-profile page: ' + next));
        }
        return fetchUrl(next, redirectCount + 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ html: data, status: res.statusCode }));
    }).on('error', reject);
  });
}

// Test with a well-known public profile (use your own URL)
fetchUrl('https://www.cloudskillsboost.google/public_profiles/3763951?locale=en')
  .then(({ html, status }) => {
    console.log('Final status:', status, 'HTML length:', html.length);
    // Look for key selectors
    const selectors = [
      'public-profile__badge',
      'public-profile__hero',
      'ql-title-medium',
      'ql-body-medium',
      'ql-display-small',
      'badge-title',
      'profile-badge',
      'badge-card',
      'earned',
      'ql-badge',
    ];
    selectors.forEach(s => {
      const count = (html.match(new RegExp(s, 'g')) || []).length;
      console.log(`  "${s}": ${count} occurrences`);
    });
    // Show first 3000 chars
    console.log('\nFIRST 3000 CHARS:\n', html.slice(0, 3000));
  })
  .catch(err => console.error('Error:', err.message));
