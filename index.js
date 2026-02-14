//step third
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//step five 
app.use(express.static(path.join(__dirname, 'public')));    // _dirname => path to the project + public => path upto public folder
app.set('view engine', 'ejs');  //forth step...



//route setup
app.get("/", function (req, res) {
    fs.readdir(`./files`, function (err, files) {
        res.render("index", { files: files }) // this render will open any file in the views folder
    })
})

app.get("/files/:filename", function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, data) {
        res.render("show", { filename: req.params.filename, filedata: data });
    })
})

app.get("/edit/:filename", function (req, res) {
    res.render("edit", { filename: req.params.filename });
})
app.post("/edit", function (req, res) {
    const oldPath = `./files/${req.body.previous}`;
    const newPath = `./files/${req.body.new}`;

    // Check if the "delete" button was pressed
    if (req.body.action === 'delete') {
        fs.unlink(oldPath, (err) => {
            if (err) console.log("Error deleting file", err);
            res.redirect("/");
        });
    } 
    // Otherwise, it's a rename (Confirm)
    else {
        // Only rename if a new name was actually provided
        if (req.body.new && req.body.new !== req.body.previous) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) console.log("Error renaming file", err);
                res.redirect("/");
            });
        } else {
            // If no new name, just go back home
            res.redirect("/");
        }
    }
});


app.post("/create", function (req, res) {
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`, req.body.details, function (err) {
        if (err) {
            console.log("There is an error in creating file");
        } else {
            console.log("File Created Successfully");
            res.redirect("/");
        }
    })
})


// This runs on every page load
document.addEventListener('DOMContentLoaded', () => {
    console.log("Scripts loaded and DOM ready");

    /**
     * Use the '?.' operator (Optional Chaining) to prevent errors 
     * if an element isn't found on a specific page.
     */

    // 1. Example: Handle the Create Form (Only on Index page)
    const createForm = document.querySelector('form[action="/create"]');
    createForm?.addEventListener('submit', () => {
        console.log("Creating a new task...");
    });

    // 2. Example: Handle the Edit Form (Only on Edit page)
    const editForm = document.querySelector('form[action="/edit"]');
    editForm?.addEventListener('submit', () => {
        console.log("Processing edit/delete...");
    });

    // 3. Simple click handler example
    document.querySelector('#some-button-id')?.addEventListener('click', () => {
        alert("Button clicked!");
    });
});



app.listen(3000, function () {
    console.log("Server is Live Now");
})