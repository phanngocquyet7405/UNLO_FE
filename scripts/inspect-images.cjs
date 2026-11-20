const fs = require('fs');
const path = require('path');

const root = path.resolve('public/assets/img/custom-drive');
const entries = fs.readdirSync(root);

for (const entry of entries) {
  const p = path.join(root, entry);
  if (fs.statSync(p).isDirectory()) {
    console.log(`[DIRECTORY] ${entry}:`);
    for (const f of fs.readdirSync(p)) {
      const sp = path.join(p, f);
      console.log(`   - ${f} (${fs.statSync(sp).size} bytes)`);
    }
  } else {
    console.log(`[FILE] ${entry} (${fs.statSync(p).size} bytes)`);
  }
}
