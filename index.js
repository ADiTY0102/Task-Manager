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
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, (err) => {
        if (err) {
            console.log("There is an error in renaming file",err);
        } else {
            console.log("File Renamed Successfully");
            res.redirect("/");
        }
    })
    fs.unlink(`./files/${req.body.previous}`,(err) => {
        if (err) {
            console.log("There is an error in deleting file",err);
        } else {
            console.log("File Deleted Successfully");
            res.redirect("/");
        }
    })
})


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
app.listen(3000, function () {
    console.log("Server is Live Now");
})