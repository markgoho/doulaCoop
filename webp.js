const imagemin = require('imagemin');
const webp = require('imagemin-webp');

// webp config
const outputFolder = './images-to-convert';
const JPEGImages = './images-to-convert/*.jpg';

imagemin([JPEGImages], outputFolder, {
  plugins: [
    webp({
      quality: 65,
      method: 6
    })
  ]
});
