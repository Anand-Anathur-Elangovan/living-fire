const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

const optimizeImages = async () => {
  try {
    // Process public folder
    const publicImages = await glob('public/**/*.{jpg,jpeg,png}');
    await processImages(publicImages, 'public');

    // Process src/assets folder if it exists
    const assetImages = await glob('src/assets/**/*.{jpg,jpeg,png}');
    if (assetImages.length) {
      await processImages(assetImages, 'src/assets');
    }

    console.log('✅ Image optimization complete');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
};

const processImages = async (files, basePath) => {
  await Promise.all(
    files.map(async (file) => {
      const outputPath = file
        .replace(basePath, `${basePath}/optimized`)
        .replace(/\.(jpg|jpeg|png)$/, '.webp');

      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

      await sharp(file)
        .webp({ quality: 75 })
        .resize({ width: 1920, withoutEnlargement: true })
        .toFile(outputPath);

      console.log(`Optimized: ${file} → ${outputPath}`);
    })
  );
};

optimizeImages();