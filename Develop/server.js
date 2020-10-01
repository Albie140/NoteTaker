const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

var note = []

//API Routes

//GET api/notes
//get data somehow from db.json
///return res.json(data)---- from get notes function in index.js...
app.get("/api/notes", function (req, res) {
    return res.json(note)
})

//POST /api/notes
//recieve JSOn object from the front end
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log(newNote);
    note.push(newNote);
    res.json(newNote);
    
})
// return res.status(200).end();

//DELETE /api/notes/:id
// /api/notes/2

//HTML Routes
app.use(express.static("public"))

//GET /notes -> notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//GET *  -> index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})