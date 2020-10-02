const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const util = require("util");
const uniqid = require("uniqid")

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

//API Routes

//GET api/notes
//get data somehow from db.json
///return res.json(data)---- from get notes function in index.js...
app.get("/api/notes", function (req, res) {
    readNote().then(currNote => {
        console.log(currNote);
        var parseNote = JSON.parse(currNote); 
    return res.json(parseNote)});
    
})

function writeNote(data){
    return writeFileAsync("db/db.json", JSON.stringify(data))
}
//POST /api/notes
//recieve JSON object from the front end

app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    const noteId = uniqid()
    
    const newNoteId = {
        title: newNote.title,
        text: newNote.text,
        id: noteId
    }
    readNote().then(currNote => {
        console.log(currNote);
        var parseNote = JSON.parse(currNote); 
        parseNote.push(newNoteId)
        return parseNote
    }) .then(combinedNote => {
        writeNote(combinedNote);
        res.json(combinedNote)
    })
    
});

function readNote(){
    return readFileAsync("db/db.json", "utf8")
}

//DELETE /api/notes/:id
// /api/notes/2
//save the deleted version of the motes with that note removed--> fs.writeFile

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