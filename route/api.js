const router = require('express').Router()
const fs = require('fs')
const util = require('util')
const { v4: uuidv4 } = require('uuid');   // Import uuid



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
    console.log(data)
    console.log(req, "Req")
    console.log(res, "Res")
    /*
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = words.filter(word => word.length > 6);
    
    console.log(result);
    // expected output: Array ["exuberant", "destruction", "present"]
    */

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

    // aryNotes =  allNotes

    // console.log(allNotes)

    })
})

router.post('/', (req, res) => {
    // Get the data
  var newId    = uuidv4()
  var newTitle = req.body.title
  var newText  = req.body.text

  // var newNote = {title: newTitle, text: newText}
  var newNote = {id: newId, title: newTitle, text: newText}

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
      console.log(data)
    write(data)
    res.json(data)
})




  
})

module.exports = router