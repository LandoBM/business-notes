const express = require('express')
const app = express()
const fs = require('fs')
const dbData = require('./db/db.json')
// Using any PORT available in case 3001 is not available
const PORT = process.env.PORT || 3001

// Setting up the Express app to handle parsing
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Pulling data from the public folder using Express// Middleware
app.use(express.static('public'))

// GET Fetch for notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(`${__dirname}/notes.html`))
    // res.json(`${req.method} request received for notes.html`)
})

app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     res.json(data)
    //   }
    })
    console.info(`${req.method} request received to get notes html file`)
})

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/index.html`))
    console.log(`${req.method} request received to get index html file`)
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});