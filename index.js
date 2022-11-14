//import expresss
const { request } = require('express')
const express = require('express')
//store it in the app variable
const app = express()
//cors middleware addition-allows request from all sources
const cors = require('cors')
app.use(cors())
//middleware for frontend 
app.use(express.static('build'))
//json-parser to help us access the request body for a POST request
app.use(express.json())
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
  app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })


  //DELETE
  app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
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
    .catch(error => next(error))
  })


  //Updating data on the Database
  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })


  //UnknownEndPoints
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


  //error handler
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)


//Tell the server on what port it should listen to for an incoming server request from client.  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})