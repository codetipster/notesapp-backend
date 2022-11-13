//import expresss
const { request } = require('express')
const express = require('express')
//store it in the app variable
const app = express()
//json-parser to help us access the request body for a POST request
app.use(express.json())
//cors middleware addition-allows request from all sources
const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
//temporarily store resources in a notes variable- this should come from DB
let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

  //Replacing the above notes array with a mongoDB/mongoose data
const mongoose = require('mongoose')
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

const password = process.argv[2]

//database connection url
const url = `mongodb+srv://notesapp:${password}@cluster0.gyc0yac.mongodb.net/noteApp?retryWrites=true&w=majority`

//define a schema as a Js object
const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
//create a document with the schema
const Note = mongoose.model('Note', noteSchema)

  //Defining routes to respond to http requests for the above resource.
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  //get ALL notes
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  //get a single unique note: handles all HTTP GET requests that are of the form /api/notes/SOMETHING
  app.get('/api/notes/:id', (request, response) => {
    //get the string id from the request obj by accessing the http request payload using param
    const id = Number(request.params.id)
    //search through the server for the note with the unique id
    const note = notes.find(n => n.id === id)
    // return the note as json if note is found, else return a 404 network error.
    if(note){
        response.json(note)
    }else{
        //accessing the status parameter of the response object
        response.status(404).end()
    }
  })


  //DELETE
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    //return all other note, except the one with this id
    notes = notes.filter(n => n.id !== id)
    response.status(204).end()
  })



  //POST new data to server
  app.post('/api/notes', (request, response) => {
    //to attach id, if notes already exist, creat an array of id's(map) 4 all the notes, and find the maximum one

    const generateId = () => {
        const  maxID = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
        return maxID + 1
    } 

    const body = request.body  //access request body to get user added content
    if(!body.content){
        return response.status(400).json({
            error: "content is missing"
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)
    response.json(note)
  })


  //UnknownEndPoints
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)



//Tell the server on what port it should listen to for an incoming server request from client.  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})