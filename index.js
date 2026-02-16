const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const app = require('express')();
const fs = require('fs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define files directory safely
const filesDir = path.join(__dirname, "files");

// Static files and View Engine
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session & Flash Setup
app.use(session({
    secret: 'secret-key', // In production, use a random string
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.get("/", function (req, res) {
    fs.readdir(filesDir, function (err, files) {
        if (err) {
            console.log("Error reading directory", err);
            req.flash('error', 'Could not load tasks.');
            return res.render("index", { files: [] });
        }
        res.render("index", { files: files });
    });
});

app.post("/create", function (req, res) {
    const title = req.body.title;
    const details = req.body.details;

    if (!title || !details) {
        req.flash('error', 'Title and details are required.');
        return res.redirect("/");
    }

    // Removing spaces from title for the filename
    const safeTitle = title.split(" ").join('') + ".txt";
    const filePath = path.join(filesDir, safeTitle);

    fs.writeFile(filePath, details, function (err) {
        if (err) {
            console.log("Error creating file", err);
            req.flash('error', 'Failed to create task.');
            return res.redirect("/");
        }
        req.flash('success', 'Task created successfully!');
        res.redirect("/");
    });
});

app.get("/files/:filename", function (req, res) {
    const filePath = path.join(filesDir, req.params.filename);

    fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
            req.flash('error', 'Task not found.');
            return res.redirect("/");
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
            if (err) {
                req.flash('error', 'Could not delete task.');
            } else {
                req.flash('success', 'Task deleted successfully.');
            }
            res.redirect("/");
        });
    } 
    // Rename action
    else {
        if (req.body.new && req.body.new !== req.body.previous) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    req.flash('error', 'Error renaming task.');
                } else {
                    req.flash('success', 'Task renamed successfully!');
                }
                res.redirect("/");
            });
        } else {
            res.redirect("/");
        }
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});