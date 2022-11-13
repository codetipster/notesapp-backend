//import mongoose
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

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Note({
      content: 'CSS is very hard but made easy with libraries',
      date: new Date(),
      important: false,
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
