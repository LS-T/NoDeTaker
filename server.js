// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Set app to express method
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// API routes

app.get("/api/notes", (err, res) => {
  try {
    // Read notes from json file
    let noteData = fs.readFileSync("./db/db.json", "utf8");
    console.log("Success reading file");
    // Parse noteData so that it delivers an array of objects
    noteData = JSON.parse(noteData);
    res.json(noteData);
  } catch (err) {
    console.log(new Error("something went wrong"));
    res.send(err);
  }
  // send notes to browser
});

app.post("/api/notes", (req, res) => {
  // let new note = posted object

  try {
    // Read notes from json file
    let noteData = fs.readFileSync("./db/db.json", "utf8");
    console.log("Success reading file");
    // Parse noteData so that it delivers an array of objects
    noteData = JSON.parse(noteData);
    let newNote = req.body;
    console.log(newNote);
    // generate a random ID for posted note

    // assign a id property to newNote using uuidv4() method
    newNote.id = uuidv4();
   
    // push newNote object into array
    noteData.push(newNote);

    // stringify noteData in order to write to file db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteData), "utf8");
    res.json(newNote);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/api/notes/:id", (req, res) => {
  try {
    let noteData = fs.readFileSync("./db/db.json", "utf8");
    noteData = JSON.parse(noteData);
    let filteredNote = noteData.filter((note) => {
      if (note.id !== req.params.id) {
        return note;
      }
    });
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNote), "utf8");
    res.send("successfully deleted note");
  } catch (err) {
    res.send(err);
  }
});

// HTML routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// server listener 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
