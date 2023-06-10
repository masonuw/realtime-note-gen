const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// JSON funcs to read/append to/add to .json
const { readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');

// GET
notes.get('/', (req, res) => {
    // Reads .json, returns parsed
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))

    // Log to proof GET
    console.log('GET')
});

// POST
notes.post('/', (req, res) => {
    // Note format
    const { title, text } = req.body;
    // Func for creating new note, adding to JSON
    if (req.body) {
        // New note with UUID, title, text
        const newNote = {
            id: uuidv4(),
            title,
            text
        };
        // Add to JSON func
        readAndAppend(newNote, './db/notes.json');
        // Confirm response
        res.json('Added');

        // Log to proof POST
        console.log('POST')
    } else {
        // Error response
        res.error(err);
    }
});

// Func to delete note
notes.delete('/:id', (req, res) => {
    // Requested ID
    const noteId = req.params.id;
    // JSON filter to group notes without selected ID + update JSON/err if error
    if (req.body) {
        readFromFile('./db/notes.json')
            .then((data) => JSON.parse(data))
            .then((json) => {
                // Filter as var to grab notes without selected ID
                const output = json.filter((note) => note.id !== noteId);
                // Filter var replaces previous JSON instance
                writeToFile('./db/notes.json', output);
                // Confirm response
                res.json('Deleted');
                // Log to proof DELETE
                console.log('DELETE')
            });
    } else {
        res.error(err);
    }
});

module.exports = notes;