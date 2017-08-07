const functions = require('firebase-functions');
const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.render(`index`, { title: 'index' });
});

app.get('/members-only', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  response.render(`members-only`, { title: 'monthly-meetings' });
});

exports.app = functions.https.onRequest(app);
