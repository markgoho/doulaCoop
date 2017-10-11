const pug = require('pug');

const html = pug.renderFile('src/templates/the-doulas.pug', {
  debug: true,
  compileDebug: true
});

console.log(html);
