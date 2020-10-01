const fs = require("fs");
const note = require("../Develop/db/db.json");
const path = require("path");
const express = require("express");
const app = express();
const db = require("./db/db.json");
const util = require("util");

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
    
    readNote().then(currNote => {
        console.log(currNote);
        var parseNote = JSON.parse(currNote); 
        parseNote.push(newNote)
        return parseNote
    }) .then(combinedNote => {
        writeNote(combinedNote);
        res.json(combinedNote)
    })
    
});

function readNote(){
    return readFileAsync("db/db.json", "utf8")
}
// fs.writeFile("/api/notes", db, function (err) {
//     if(err) {
//     console.log("Saved!")}
// } );
// return res.status(200).end();

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