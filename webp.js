const imagemin = require('imagemin');
const webp = require('imagemin-webp');

// webp config
const outputFolder = './img/headshots/thumbs';
const JPEGImages = './img/headshots/thumbs/*.jpg';

imagemin([JPEGImages], outputFolder, {
	plugins: [webp({
    quality: 65,
    method: 6
  })]
});