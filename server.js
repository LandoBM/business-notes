const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path')
// UUID method for generating unique ids
const { v4: uuidv4 } = require("uuid");
// use uuidv4() for unique ID

const dbData = require("./db/db.json");
// Using any PORT available in case 5500 is not available
const PORT = process.env.PORT || 5500;

// Setting up the Express app to handle parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pulling data from the public folder using Express// Middleware
app.use(express.static("public"));

// GET Fetch for notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/notes.html`));
  console.info(`${req.method} request received for notes.html`);
});

// Serve the Notes File
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Added const to make the data parsed when shown.
      const dataParse = JSON.parse(data);
      res.json(dataParse);
    }
  });
  console.info(`${req.method} request received to get notes html file`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
  console.log(`${req.method} request received to get index html file`);
});

app.post("/api/notes", (req, res) => {
  // Logging that POST request was received
  console.info(`${req.method} request received to add a note`);

  //  Deconstructing assignment for the items in req.body
  const { title, text } = req.body;
  // If the required properties are available (title, text)
  if (title && text) {
    // Created new variable for the object that will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        res.json(err);
      } else {
        const dataParse = JSON.parse(data);
        dataParse.push(newNote);
        fs.writeFile("./db/db.json", JSON.stringify(dataParse), (err) => {
          if (err) {
            res.json(err);
          } else {
            res.json(newNote);
          }
        });
      }
    });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
