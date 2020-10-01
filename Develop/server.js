// const fs = require("fs")
const note = require("../Develop/db/db.json");
const path = require("path");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;


//API Routes

//GET api/notes
//get data somehow from db.json
///return res.json(data)---- from get notes function in index.js...
app.get("/api/notes", function (req, res) {
    return res.json(note)
})

//POST /api/notes
//recieve JSON object from the front end
app.post("/api/notes", function (req, res) {
    var newNote = {
        id: newNote.length + 1,
        title: req.body.title,
        text: req.body.text
    }
    note.push(newNote);
    res.json(newNote);

})
// return res.status(200).end();

//DELETE /api/notes/:id
// /api/notes/2
// app.delete("/api/notes/:id", (req, res) => {
//     res.send(id)
// })

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



//Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})