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


  //Replacing the above notes array with a mongoDB/mongoose data from models folder
const Note = require('./models/notes')


//Defining routes to respond to http requests for the above resource.
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//get ALL notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
   })
})

  //get a single unique note: handles all HTTP GET requests that are of the form /api/notes/SOMETHING
  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })


  //DELETE
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    //return all other note, except the one with this id
    notes = notes.filter(n => n.id !== id)
    response.status(204).end()
  })



  //POST new data to server(this time we are posting to the database!)
  app.post('/api/notes', (request, response) => {
    
    const body = request.body  //access request body to get user added content from  form
    if(body.content===undefined){
        return response.status(400).json({
            error: "content is missing"
        })
    }
    //create new note from content body with the Note object.
    const note = new Note ({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
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