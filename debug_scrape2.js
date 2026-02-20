const https = require('https')

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-US,en;q=0.5',
}

function fetchFollow(url, redirects) {
  if (redirects > 8) return console.log('Too many redirects')
  const u = new URL(url)
  const req = https.request({ hostname: u.hostname, path: u.pathname + u.search, method: 'GET', headers }, (res) => {
    console.log('Status:', res.statusCode, 'URL:', url)
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const loc = res.headers.location.startsWith('http') ? res.headers.location : `https://${u.hostname}${res.headers.location}`
      return fetchFollow(loc, redirects + 1)
    }
    let data = ''
    res.on('data', c => data += c)
    res.on('end', () => {
      const fs = require('fs')
      fs.writeFileSync('profile_dump2.html', data)
      console.log('Saved', data.length, 'bytes')
      data.split('\n').forEach((line, i) => {
        if (/profile-badge|ql-badge|badge-name|profile__hero|ql-display|Earned|public.profile|avatar|username/.test(line)) {
          console.log(i + ':', line.substring(0, 300))
        }
      })
    })
  })
  req.on('error', e => console.error('ERR:', e.message))
  req.end()
}

// Try new skills.google URL format
fetchFollow('https://www.skills.google/public_profiles/3763951?locale=en', 0)
