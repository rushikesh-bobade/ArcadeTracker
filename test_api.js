const http = require('http');

function testApi(url, label) {
  return new Promise((resolve) => {
    const body = JSON.stringify({ url });
    const req = http.request(
      { hostname: 'localhost', port: 3000, path: '/api/scrape', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } },
      (res) => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => {
          console.log('\n=== ' + label + ' ===');
          console.log('HTTP Status:', res.statusCode);
          try {
            const j = JSON.parse(d);
            if (j.error) {
              console.log('Error:', j.error);
            } else {
              console.log('Name:', j.name);
              console.log('Badges:', j.badgesEarned);
              console.log('Arcade:', j.arcadeCount, '| Trivia:', j.triviaCount, '| Skill:', j.skillCount);
              console.log('Points: arcade=' + j.arcadePoints + ' trivia=' + j.triviaPoints + ' skill=' + j.skillPoints + ' bonus=' + j.milestoneBonus + ' total=' + j.totalPoints);
              console.log('Milestone:', j.currentMilestone, '| Prize:', j.currentPrizeTier);
            }
          } catch {
            console.log('Raw:', d.slice(0, 300));
          }
          resolve();
        });
      }
    );
    req.write(body);
    req.end();
  });
}

(async () => {
  // Test 1: Invalid URL
  await testApi('https://google.com', 'Invalid domain');
  // Test 2: Bad profile ID (redirects away from profile page)
  await testApi('https://www.cloudskillsboost.google/public_profiles/BADID', 'Non-existent profile');
  // Test 3: Missing public_profiles
  await testApi('https://www.cloudskillsboost.google/profile', 'Missing public_profiles');
})();
