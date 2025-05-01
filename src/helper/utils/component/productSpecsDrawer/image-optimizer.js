// // utils/image-optimizer.js
// const sharp = require('sharp');

// async function optimizeImage(inputPath, outputPath) {
//   await sharp(inputPath)
//     .resize(1200)
//     .webp({ quality: 80 })
//     .toFile(outputPath);
// }

// Usage: 
// optimizeImage('src/assets/raw/logo.png', 'public/images/logo.webp');