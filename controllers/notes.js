const notesRouter = require('express').Router()
const Note = require('../models/notes')

//get ALL notes
notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })

//get a single unique note
notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

//delete a note
notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

// add a note
notesRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date()
    })
  
    note.save()
      .then(savedNote => {
        response.json(savedNote)
      })
      .catch(error => next(error))
  })

//edit a note
notesRouter.put('/:id', (request, response, next) => {
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
  
  //export/expose this module for use by other modules too
  module.exports = notesRouter