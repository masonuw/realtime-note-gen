// Import express, app
const express = require('express');
const app = express();

// Import/use notes route
const notesRouter = require('./notes');
app.use('/notes', notesRouter);

// Export app
module.exports = app;