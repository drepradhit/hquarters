import fs from 'fs';

const files = [
  'homepage-id.json',
  'page-spaces-hub-id.json',
  'page-find-space-id.json',
  'page-space-premium-office-id.json',
  'page-space-soho-id.json',
  'page-space-serviced-office-id.json',
  'page-space-virtual-office-id.json',
  'page-space-function-room-id.json',
  'page-building-id.json',
  'page-companies-id.json',
  'page-insights-id.json',
  'page-location-id.json',
  'theme-single-post.json'
];

let ok = 0, fail = 0;
console.log('=== VALIDASI 13 FILE TEMPLATE ===\n');
for (const f of files) {
  try {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    let widgets = 0, badIds = 0, dynamicTags = 0, posts = 0;
    function walk(n) {
      if (n.elType === 'widget') {
        widgets++;
        if (n.widgetType === 'posts') posts++;
        if (n.settings && n.settings.__dynamic__) {
          dynamicTags += Object.keys(n.settings.__dynamic__).length;
        }
      }
      if (!n.id || n.id.length < 5) badIds++;
      (n.elements || []).forEach(walk);
    }
    j.content.forEach(walk);
    const kb = (fs.statSync(f).size / 1024).toFixed(0);
    console.log(
      `  OK   ${f.padEnd(38)} ${String(j.type).padEnd(7)} ${String(j.content.length).padStart(2)} sec  ${String(widgets).padStart(4)} w  ` +
      `${String(dynamicTags).padStart(2)} dyn  ${String(posts).padStart(2)} posts  ${kb.padStart(5)} KB`
    );
    ok++;
  } catch (e) {
    console.log(`  FAIL ${f}  -- ${e.message}`);
    fail++;
  }
}
console.log(`\nOK=${ok}  FAIL=${fail}`);
