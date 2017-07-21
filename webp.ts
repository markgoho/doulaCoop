import * as imagemin from 'imagemin';
import * as webp from 'imagemin-webp';

// webp config
const outputFolder = 'imgages-to-convert';
const JPEGImages = 'imgages-to-convert/*.jpg';

imagemin([JPEGImages], outputFolder, {
  plugins: [
    webp({
      quality: 65,
      method: 6
    })
  ]
});
