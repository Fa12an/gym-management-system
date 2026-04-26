const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Path to your logo
const inputImage = path.join(__dirname, 'src/assets/images/Muscle_Universe_Logo.jpeg');
const outputDir = path.join(__dirname, 'public');

// Create favicon sizes
const sizes = [16, 32, 96, 180];

async function generateFavicons() {
  try {
    for (const size of sizes) {
      const fileName = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}x${size}.png`;
      const outputPath = path.join(outputDir, fileName);
      
      await sharp(inputImage)
        .resize(size, size)
        .toFormat('png')
        .toFile(outputPath);
      
      console.log(`Generated ${fileName}`);
    }
    
    // Create favicon.ico (multiple sizes)
    const ico = require('sharp-ico');
    await ico.sharpIco({
      src: inputImage,
      dest: path.join(outputDir, 'favicon.ico'),
      sizes: [16, 32, 48, 64]
    });
    
    console.log('Generated favicon.ico');
    console.log('✅ All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
