const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '../public/catalog');
const outputJsonPath = path.join(__dirname, '../public/catalog/alt-text-mapping.json');

// Result object to store the mapping
const altTextMapping = {};

function processDirectory(dirPath, categoryKey = '') {
  const items = fs.readdirSync(dirPath);

  // Separate directories and files
  const directories = [];
  const imageFiles = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      directories.push(item);
    } else if (/\.(png|jpg|jpeg|webp)$/i.test(item) && !item.startsWith('.')) {
      imageFiles.push(item);
    }
  }

  // Process image files in current directory
  if (imageFiles.length > 0) {
    const relativeDirPath = path.relative(catalogPath, dirPath);
    const mappingKey = relativeDirPath || 'root';

    if (!altTextMapping[mappingKey]) {
      altTextMapping[mappingKey] = [];
    }

    imageFiles.forEach((file, index) => {
      const ext = path.extname(file);
      const altText = path.basename(file, ext); // Original filename without extension is the alt text
      const newFileName = `${String(index + 1).padStart(3, '0')}${ext}`;

      const oldPath = path.join(dirPath, file);
      const newPath = path.join(dirPath, newFileName);

      // Add to mapping
      altTextMapping[mappingKey].push({
        filename: newFileName,
        altText: altText,
        path: `/catalog/${relativeDirPath ? relativeDirPath + '/' : ''}${newFileName}`.replace(/\\/g, '/')
      });

      // Rename the file
      if (file !== newFileName) {
        console.log(`Renaming: ${file} -> ${newFileName}`);
        fs.renameSync(oldPath, newPath);
      }
    });
  }

  // Recursively process subdirectories
  for (const dir of directories) {
    const fullDirPath = path.join(dirPath, dir);
    processDirectory(fullDirPath, dir);
  }
}

// Main execution
console.log('Starting catalog image rename process...\n');
console.log('Catalog path:', catalogPath);

try {
  processDirectory(catalogPath);

  // Write the mapping JSON
  fs.writeFileSync(outputJsonPath, JSON.stringify(altTextMapping, null, 2), 'utf8');

  console.log('\n✓ Successfully renamed all images');
  console.log(`✓ Alt-text mapping saved to: ${outputJsonPath}`);
  console.log('\nMapping structure:');

  for (const [key, items] of Object.entries(altTextMapping)) {
    console.log(`  ${key}: ${items.length} images`);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
