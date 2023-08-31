const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // To generate unique IDs

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(port, () => {
  console.log("Server is running on port {port}");
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("develop/db/db.json", "utf8"));
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("develop/db/db.json", "utf8"));
  notes.push(newNote)
});

// Default route for any other request
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Fetch existing notes and render them
async function getAndRenderNotes() {
  const response = await fetch("/api/notes");
  const notes = await response.json();
  // Render the notes in the left column
}

// Save a new note
async function saveNote() {
  const title = document.querySelector(".note-title").value;
  const text = document.querySelector(".note-textarea").value;

  if (title && text) {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text }),
    });

    getAndRenderNotes();
  }
}

// Attach event listeners
document.querySelector(".save-note").addEventListener("click", saveNote);

// Serve the notes.html file when the /notes route is accessed
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// API endpoint to get existing notes
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("develop/db/db.json", "utf8"));
  res.json(notes);
});

// API endpoint to save a new note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4(); // Generate a unique ID for the new note
  const notes = JSON.parse(fs.readFileSync("develop/db/db.json", "utf8"));
  notes.push(newNote);
  fs.writeFileSync("develop/db/db.json", JSON.stringify(notes));
  res.json(newNote);
});
