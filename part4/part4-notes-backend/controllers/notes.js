const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  } 

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id,
    })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  const note = await Note.findById(request.params.id)
  if (!note) {
    return response.status(404).end()
  }

  note.content = content
  note.important = important

  const updatedNote = await note.save()
  response.json(updatedNote)
})

module.exports = notesRouter