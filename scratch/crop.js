import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public');

// Only crop BI dashboard screenshots (the ones taken from PDF)
const BI_IMAGES = [
  'Sales_Dashboard.png',
  'Finance_Dashboard1.png',
  'Finance_Dashboard2.png',
  'Finance_Dashboard3.png',
  'Finance_Dashboard4.png',
  'Inventory_Dashboard1.png',
  'Inventory_Dashboard2.png',
  'Inventory_Dashboard3.png',
];

async function cropImages() {
  for (const file of BI_IMAGES) {
    const filePath = path.join(directoryPath, file);

    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file} — not found.`);
      continue;
    }

    const tempFilePath = path.join(directoryPath, `temp_${file}`);

    try {
      const metadata = await sharp(filePath).metadata();
      const cropTop = 10;    // Remove remaining toolbar remnant
      const cropRight = 0;   // Already trimmed

      if (metadata.height > cropTop) {
        await sharp(filePath)
          .extract({
            left: 0,
            top: cropTop,
            width: metadata.width - cropRight,
            height: metadata.height - cropTop,
          })
          .toFile(tempFilePath);

        // Replace original with cropped
        fs.renameSync(tempFilePath, filePath);
        console.log(`Cropped ${file} — removed ${cropTop}px top, ${cropRight}px right (${metadata.width}x${metadata.height} → ${metadata.width - cropRight}x${metadata.height - cropTop})`);
      } else {
        console.log(`${file} is too small to crop.`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log('\nDone!');
}

cropImages();
