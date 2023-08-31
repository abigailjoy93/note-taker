const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");

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
  notes.push(newNote);
  fs.writeFileSync("develop/db/db,json", JSON.stringify(notes));
  res.json(newNote);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
