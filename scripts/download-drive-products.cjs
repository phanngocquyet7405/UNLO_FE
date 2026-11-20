const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FOLDERS = {
  tshirt: '1IIGaN183PnSpLdVGQz55q7nMLztIWqWA',
  sweater: '1Chj8woULMPStQHUNSo9f2B-iHUfAhpa3',
  hoodie: '1tre7XhWU2kfub1C0I9RjE51WhmLVyk-4',
  jacket: '16KppZdi8REfATc4ZLiKpgaBv-3tNb8dR',
  fabrics: '1NKkMKaErvEkR9hk_CvOF8em9jhwU3tam'
};

const BASE_OUT = path.resolve('public/assets/img/custom-drive');
if (!fs.existsSync(BASE_OUT)) fs.mkdirSync(BASE_OUT, { recursive: true });

const results = {};

for (const [key, folderId] of Object.entries(FOLDERS)) {
  const dir = path.join(BASE_OUT, key);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log(`Searching folder: ${key} (${folderId})...`);
  const raw = execSync(`gdrive readonly search --parent-id ${folderId} --json`, { encoding: 'utf-8' });
  const files = JSON.parse(raw);
  results[key] = files;
  console.log(`Found ${files.length} files in ${key}`);

  for (const file of files) {
    const dest = path.join(dir, file.name);
    if (!fs.existsSync(dest)) {
      console.log(`Downloading ${file.name} (id: ${file.id})...`);
      try {
        execSync(`gdrive readonly download ${file.id} --out "${dest}"`);
      } catch (e) {
        console.error(`Failed to download ${file.name}:`, e.message);
      }
    } else {
      console.log(`Already exists: ${file.name}`);
    }
  }
}

fs.writeFileSync(path.join(BASE_OUT, 'manifest.json'), JSON.stringify(results, null, 2));
console.log('Finished downloading all files!');
