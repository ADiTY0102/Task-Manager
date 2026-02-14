const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define files directory safely (VERY IMPORTANT FOR DOCKER)
const filesDir = path.join(__dirname, "files");

// step five
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// route setup
app.get("/", function (req, res) {
    fs.readdir(filesDir, function (err, files) {
        if (err) {
            console.log("Error reading directory", err);
            return res.send("Error loading files");
        }
        res.render("index", { files: files });
    });
});

app.post("/create", function (req, res) {
    const title = req.body.title;
    const details = req.body.details;

    if (!title || !details) {
        return res.send("Title and details required");
    }

    const filePath = path.join(filesDir, title + ".txt");

    fs.writeFile(filePath, details, function (err) {
        if (err) {
            console.log("Error creating file", err);
            return res.send("Error creating task");
        }

        res.redirect("/");
    });
});


app.get("/files/:filename", function (req, res) {
    const filePath = path.join(filesDir, req.params.filename);

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            console.log("Error reading file", err);
            return res.send("Error reading file");
        }
        res.render("show", { 
            filename: req.params.filename, 
            filedata: data 
        });
    });
});

app.get("/edit/:filename", function (req, res) {
    res.render("edit", { filename: req.params.filename });
});

app.post("/edit", function (req, res) {
    const oldPath = path.join(filesDir, req.body.previous);
    const newPath = path.join(filesDir, req.body.new);

    // Delete action
    if (req.body.action === 'delete') {
        fs.unlink(oldPath, (err) => {
            if (err) console.log("Error deleting file", err);
            res.redirect("/");
        });
    } 
    // Rename action
    else {
        if (req.body.new && req.body.new !== req.body.previous) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) console.log("Error renaming file", err);
                res.redirect("/");
            });
        } else {
            res.redirect("/");
        }
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
