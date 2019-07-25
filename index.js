// implement your API here
const express = require('express')
const server = express()
const db = require('./data/db.js')

server.use(express.json())

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    }).catch(err => {
      res.status(500).json({ success: false, err })
    })
})

server.get('/api/users/:id', (req, res) => {
  const userID = req.params.id
  if(!userID) {
    console.log("could not find ", userID)
    res.status(404).json({ errorMessage: "user with that ID doesn't exist" })
  }
  else {
    db.findById(userID)
      .then(user => {
        res.status(200).json(user)
      }).catch(err => {
        res.status(500).json({ success: false, err })
      })
  }
})

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body
  if(!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  else{
    db.insert({name, bio})
      .then(user => {
        console.log("added: ", user)
        res.status(201).json({ success: true, user })
      })
      .catch(err => {
        res.status(500).json({ success: false, err })
      })
  }
})

server.delete('/api/users/:id', (req, res) => {
  const userID= req.params.id
  if(!userID) {
    res.status(404).json({ errorMessage: "mate with that ID doesn't exist" })
  }
  else {
    db.remove(userID)
      .then(deleted => {
        if(deleted) {
          res.status(204).end()
        }
        else {
          res.status(404).json({ success: false, msg: "try again"})
        }
      })
      .catch(err => {
        err.status(500).json({ success: false, err })
      })
  }
})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id
  const userInfo = req.body
  if(!id) {
    res.status(404).json({ errorMessage: "mate with that ID doesn't exist" })
  }
  else {
    db.update(id, userInfo)
      .then(updated => {
        if(updated) {
          res.status(200).json({ success: true, updated})
          console.log("updated: ", id, userInfo)
        }
        else {
          res.status(404).json({ success: false, msg: "nuh uh"})
        }
      })
      .catch(err => {
        res.status(500).json({ success: false, err})
      })
  }
})

server.listen(3000, () => {
  console.log('doing things')
})