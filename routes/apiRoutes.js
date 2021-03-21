//importing dependencies
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        const database = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');

        res.json(JSON.parse(database));
    });

    app.post('/api/notes', (req, res) => {
        const database = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
        const parsedData = JSON.parse(database);
        const newestNote = req.body;

        newestNote.id = uniqid();

        parsedData.push(req.body);

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedData));

        res.json(true);
    });
};