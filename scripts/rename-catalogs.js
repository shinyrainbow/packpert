const fs = require('fs');
const path = require('path');

const catalogsDir = path.join(__dirname, '../public/catalogs');
const mappingFile = path.join(__dirname, '../public/catalogs/alt-text-mapping.json');

const mapping = {};
let counter = {};

function getShortName(category, subcategory, ext) {
  const key = `${category}-${subcategory}`;
  if (!counter[key]) counter[key] = 1;
  const num = String(counter[key]++).padStart(3, '0');

  // Create short category codes
  const catCode = {
    'Stick Tube': 'stick',
    'cream tube': 'tube',
    'Jar': 'jar',
    'Serum Bottle': 'serum',
    'Lip': 'lip',
    'Bottle': 'bottle',
    'Powder case': 'powder'
  }[category] || 'item';

  const subCode = subcategory
    .replace(/[ก-๙]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 20) || 'default';

  return `${catCode}-${subCode}-${num}${ext}`;
}

function processDirectory(dir, category = '', subcategory = '') {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const newCategory = category || item;
      const newSubcategory = category ? item : '';
      processDirectory(fullPath, newCategory, newSubcategory);
    } else if (stat.isFile() && /\.(png|jpg|jpeg|webp)$/i.test(item)) {
      const relativePath = path.relative(catalogsDir, fullPath);

      // Check if path is too long (> 150 chars to be safe for all platforms)
      if (fullPath.length > 150) {
        const ext = path.extname(item);
        const altText = path.basename(item, ext);
        const newName = getShortName(category, subcategory, ext);
        const newPath = path.join(path.dirname(fullPath), newName);
        const newRelativePath = path.relative(catalogsDir, newPath);

        // Store mapping
        mapping[newRelativePath] = {
          originalName: item,
          altText: altText,
          category: category,
          subcategory: subcategory
        };

        // Rename file
        console.log(`Renaming: ${item.slice(0, 50)}...`);
        console.log(`      To: ${newName}`);
        fs.renameSync(fullPath, newPath);
      }
    }
  }
}

console.log('Starting catalog file renaming...\n');
processDirectory(catalogsDir);

// Save mapping
fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2), 'utf8');
console.log(`\nDone! Renamed ${Object.keys(mapping).length} files.`);
console.log(`Alt text mapping saved to: ${mappingFile}`);
