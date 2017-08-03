const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/members-only', (request, response) => {
  response.send(`You're here at the members-only section. Coming soon!`);
});

exports.app = functions.https.onRequest(app);
