const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.use(express.static(path.resolve('public')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(3333);

module.exports = app;
