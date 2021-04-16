// Dependencies 
const express = require('express');
const path = require ('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get('/', (req,res) => res.sendFile(path.join(__dirname,'../../index.html')));

app.get('/notes', (req,res) => res.sendFile(path.join(__dirname, '../../notes.html')));

// Listener

app.listen(PORT, () =>console.log(`App listening on port ${PORT}`));



