const sharp = require('sharp');
const fs = require('fs');

async function generateBrandIcons() {
  const markPath = 'public/images/cd-mark.png';

  // 1. Generate 32x32 icon for Next.js App Router (src/app/icon.png and public/favicon.png)
  await sharp(markPath)
    .resize(32, 32, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');

  await sharp(markPath)
    .resize(32, 32, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('public/favicon.png');

  // 2. Generate 48x48 icon
  await sharp(markPath)
    .resize(48, 48, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('public/favicon-48x48.png');

  // 3. Generate Apple Touch Icon 180x180 (src/app/apple-icon.png and public/apple-touch-icon.png)
  await sharp(markPath)
    .resize(180, 180, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('src/app/apple-icon.png');

  await sharp(markPath)
    .resize(180, 180, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('public/apple-touch-icon.png');

  // 4. Overwrite src/app/favicon.ico and public/favicon.ico with our brand icon (32x32 PNG container)
  const icoBuffer = await sharp(markPath)
    .resize(32, 32, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .toFormat('png')
    .toBuffer();

  fs.writeFileSync('src/app/favicon.ico', icoBuffer);
  fs.writeFileSync('public/favicon.ico', icoBuffer);

  // 5. Generate high-res web app manifest icon (512x512)
  await sharp(markPath)
    .resize(512, 512, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('public/icon-512.png');

  console.log('Brand favicon and icons generated successfully!');
}

generateBrandIcons().catch(console.error);
