const express = require('express')
const path = require('path')    // Library that allows to access absolute path

const app = express()

const api = require('./route/api.js') 


const PORT = process.env.PORT || 3001;
    app.use(express.json())
    
    /
    app.use(express.urlencoded({extended:true}))   // NEEDED for POST route
    // Middleware and Parser

    app.use(express.static('public'))   // Is going to make watever is in public folder available to the server

    app.use('/api/notes', api) 


    app.get('/notes', (req, res) => {
        // res.sendFile('./public/notes.html')
        res.sendFile(path.join(__dirname, './public/notes.html'))

    })

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'))
    })

    // Has to be at the end
    app.listen(PORT, () => {
        console.log("Running on Port ", PORT)


})

