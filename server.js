const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // To generate unique IDs

app.use(express.json());

app.use(express.static("public"));

const notesFilePath = path.join(__dirname, "db/db.json");

app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(notesFilePath, "utf8"));
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  try {
    const newNote = req.body;
    const notes = JSON.parse(fs.readFileSync(notesFilePath, "utf8"));
    newNote.id = uuid4();
    notes.push(newNote);
    fs.writeFileSync(notesFilePath, JSON.stringify(notes));
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error`);
  }
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Default route for any other request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
