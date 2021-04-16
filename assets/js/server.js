// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const nanoId = require("nanoid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let noteData = [];

// Routes

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../../notes.html"))
);

app.get("/api/notes", (req, res) => {
  noteData = fs.readFileSync("../../db/db.json", "utf8");
  if (noteData) {
    noteData = JSON.parse(noteData);
    res.json(noteData);
    console.log("success reading file");
  } else {
    console.log("nope");
  }
});

app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  req.body.id = Math.floor(Math.random() * 100);
  let noteId = req.body.id;
  noteData.push(noteId);

  console.log(newNote);

  noteData.push(newNote);
  res.json(newNote);

  noteData = JSON.stringify(noteData);

  fs.writeFile("../../db/db.json", noteData, "utf8", (err) => {
    err ? console.log("something wrong") : console.log("success");
  });
});

// Listener

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
