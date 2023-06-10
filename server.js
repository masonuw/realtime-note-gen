// Const for express/path/api
const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');

// PORT
const PORT = process.env.PORT || 3001;

// App functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

// Home display
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

// Notes display
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Server setup
app.listen(PORT, () => {
    console.log('Now running!')});