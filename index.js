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
  db.findById(userID)
    .then(user => {
      res.status(200).json(user)
    }).catch(err => {
      res.status(500).json({ success: false, err })
    })
})

server.post('/api/users', (req, res) => {
  const userInfo = req.body
  db.insert(userInfo)
    .then(user => {
      res.status(201).json({ success: true, user })
    })
    .catch(err => {
      res.status(500).json({ success: false, err })
    })
})

server.delete('/api/users/:id', (req, res) => {
  const userID= req.params.id
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
})

server.put('/api/users/:id', (req, res) => {
  const userID = req.params.id
  const userInfo = req.body
  db.update(userID, userInfo)
    .then(updated => {
      if(updated) {
        res.status(200).json({ success: true, updated})
        console.log("updated: ", userID, userInfo)
      }
      else {
        res.status(404).json({ success: false, msg: "nuh uh"})
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err})
    })
})

server.listen(3000, () => {
  console.log('doing things')
})