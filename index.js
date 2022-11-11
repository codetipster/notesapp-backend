//import expresss
const { request } = require('express')
const express = require('express')
//store it in the app variable
const app = express()
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

  //Defining routes to respond to http requests for the above resource.

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

  





//Tell the server on what port it should listen to for an incoming server request from client.  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})