const router = require('express').Router()
const fs = require('fs')
const util = require('util')
const { v4: uuidv4 } = require('uuid');   // Import uuid
const path = require('path')    // Library that allows to access absolute path


const asyncReadFile = util.promisify(fs.readFile)
const asyncWriteFile = util.promisify(fs.writeFile)
// 'utf-8'   language
function read() {
   return asyncReadFile('./db/db.json', 'utf-8')
}

function write(notes) {
    return asyncWriteFile('./db/db.json', JSON.stringify(notes))
}

router.delete('/:id', (req, res) => {
  read().
  then((data)=>{
    let allNotes 
    
    try {
      allNotes = [].concat(JSON.parse(data)) ;
    } catch (err) {
      allNotes = []
    }

    // console.log(allNotes, req.params.id)
    let newNoteArray = allNotes.filter((data) => data.id != req.params.id)
    // console.log(newNoteArray)

    fs.writeFileSync('./db/db.json', JSON.stringify(newNoteArray))

    // Display index.html when all other routes are accessed
    // app.get('*', function(req,res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    // });

  })
})




router.get('/', (req, res) => {
    // Read the file and get all the data
    read().
    then((data)=>{
    // Put the data in a new array and parse the data 
     let allNotes = [].concat( JSON.parse(data))

    // Once we parse it, we return it to the user/frontend
    res.json(allNotes)

    })
})

router.post('/', (req, res) => {
    // Get the data
  var newId    = uuidv4()
  var newTitle = req.body.title
  var newText  = req.body.text

  // var newNote = {title: newTitle, text: newText}    Original
  var newNote = {id: newId, title: newTitle, text: newText}   // id was added : am using package uuid to generate Ids

  // Read the file again and get the data from the file
read().then(data => {
      // combine the original data with the new data
    // Spread operator    3 dots before the array
    
    return [...JSON.parse(data), newNote]

    /*  same as ...
    data.push(newNote)
    */

}).then((data) => {
      // write to the file a new array with all the data
      // console.log(data)
    write(data)
    res.json(data)
})




  
})

module.exports = router