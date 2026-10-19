const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const inputPath = 'public/images/cyber-design-house-logo.png';
  const metadata = await sharp(inputPath).metadata();
  console.log('Original metadata:', metadata);

  // We can load raw pixel buffer to remove white background cleanly
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4

  // Create a transparent dark-mode friendly version
  // Replace white background with transparency, invert or brighten dark text so it glows on #0f172a
  const darkBuffer = Buffer.alloc(data.length);
  const markOnlyBuffer = Buffer.alloc(data.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Calculate lightness
      const isWhite = r > 235 && g > 235 && b > 235;

      if (isWhite) {
        darkBuffer[idx] = 0;
        darkBuffer[idx + 1] = 0;
        darkBuffer[idx + 2] = 0;
        darkBuffer[idx + 3] = 0;
      } else {
        // If it's the dark text (CYBER, DESIGN HOUSE, border), invert/brighten for dark background
        const brightness = (r + g + b) / 3;
        if (x > 330 && brightness < 120) {
          // Dark text on the right side - convert to glowing silver-white (#f1f5f9)
          darkBuffer[idx] = Math.min(255, 255 - r + 80);
          darkBuffer[idx + 1] = Math.min(255, 255 - g + 100);
          darkBuffer[idx + 2] = Math.min(255, 255 - b + 120);
          darkBuffer[idx + 3] = a;
        } else if (brightness < 60) {
          // Border or frame
          darkBuffer[idx] = 56;
          darkBuffer[idx + 1] = 189;
          darkBuffer[idx + 2] = 248; // Cyan accent border
          darkBuffer[idx + 3] = a;
        } else {
          // Crystal mark or colored parts
          darkBuffer[idx] = r;
          darkBuffer[idx + 1] = g;
          darkBuffer[idx + 2] = b;
          darkBuffer[idx + 3] = a;
        }
      }
    }
  }

  await sharp(darkBuffer, { raw: { width, height, channels } })
    .png()
    .toFile('public/images/cyber-design-house-logo-dark.png');

  // Crop the mark specifically (approx left 32% of width)
  const markWidth = Math.floor(width * 0.35);
  await sharp(inputPath)
    .extract({ left: 35, top: 50, width: 285, height: 300 })
    .png()
    .toFile('public/images/cd-mark-raw.png');

  // Remove white background on mark
  const markRaw = await sharp('public/images/cd-mark-raw.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const mData = markRaw.data;
  const mW = markRaw.info.width;
  const mH = markRaw.info.height;
  for (let i = 0; i < mData.length; i += 4) {
    const mr = mData[i];
    const mg = mData[i + 1];
    const mb = mData[i + 2];
    if (mr > 230 && mg > 230 && mb > 230) {
      mData[i + 3] = 0;
    }
  }

  await sharp(mData, { raw: { width: mW, height: mH, channels: 4 } })
    .png()
    .toFile('public/images/cd-mark.png');

  // Create favicon
  await sharp('public/images/cd-mark.png')
    .resize(64, 64, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 0 } })
    .png()
    .toFile('public/images/favicon.png');

  console.log('Processed logo and mark successfully!');
}

processLogo().catch(console.error);
