// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// Random id generator 
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
  
});

app.post("/api/notes", (req, res) => {
  

  try {
    // Read notes from json file
    let noteData = fs.readFileSync("./db/db.json", "utf8");
    console.log("Success reading file");
    // Parse noteData so that it delivers an array of objects
    noteData = JSON.parse(noteData);
    let newNote = req.body;
    console.log(newNote);
    

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

// search for by parameter id 
app.delete("/api/notes/:id", (req, res) => {
  try {
    // Read and parse data in db.json file 
    let noteData = fs.readFileSync("./db/db.json", "utf8");
    noteData = JSON.parse(noteData);
    // filter method used to pass the note object and filter notes that pass the if conditional 
    let filteredNote = noteData.filter((note) => {
      if (note.id !== req.params.id) {
        return note;
      }
    });
    // Stringify filteredNote so it can be written to db.json file 
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNote), "utf8");
    res.send("successfully deleted note");
  } catch (err) {
    res.send(err);
  }
});

// HTML routes

// Default homepage
app.get("/"), (req,res) => 
  res.sendFile(path.join(__dirname, '/public/index.html') 
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//  universal selector - send the user back to homepage if any unknown url is inputted
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// server listener 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
