// IMPORTS AT THE TOP
const express = require('express')
const { update } = require('./dog-model')
const Dog = require(`./dog-model`)

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS
// [GET]    /             (Hello World endpoint)
server.get('/hello-world', (req, res) => {
   res.status(200).json({ message: 'Hello world!' })
})

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', async (req, res) => {
   try {
      const dogs = await Dog.findAll()
      res.status(200).json(dogs)
   } catch (err) {
      res.status(500).json({ message: `Something horrible happened, ${err.message}` })
   }
})

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get(`/api/dogs/:id`, async (req, res) => {
   try {
      const { id } = req.params
      const dogId = await Dog.findById(id)
      if (!dogId) {
         res.status(404).json({ message: `No dog with id ${id}` })
      } else {
         res.status(200).json(dogId)
      }
      // //To make an error occur with a message:
      // throw new Error(`Testing error`)
   } catch (err) {
      res.status(500).json({ message: `Error fetching dog: ${err.message}` })
   }
})

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post(`/api/dogs`, async (req, res) => {
   try {
      // throw new Error(`nooooo!`)
      const { name, weight } = req.body
      const createdDog = await Dog.create({ name, weight })

      if (!name || !weight) {
         res.status(422).json({ message: `All dogs need a name and weight.` })
      } else {
         res.status(201).json({
            message: `Created dog successful!`,
            data: createdDog
         })
      }
   } catch (err) {
      res.status(500).json({ message: `Error creating dog: ${err.message}` })
   }
})

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put(`/api/dogs/:id`, async (req, res) => {
   try {
      const { id } = req.params
      const { name, weight } = req.body
      const updatedDog = await Dog.update(id, { name, weight })
      if (!name || !weight) {
         res.status(422).json({ message: `All dogs need a name and weight.` })
      } else {
         if (!updatedDog) {
            res.status(404).json({ message: `Dog ${id} not found` })
         } else {
            res.status(200).json({ message: `Updated ${name} successfully!`, data: updatedDog })
         }
      }

   }
   catch (err) {
      res.status(500).json({ message: `Error editing dog: ${err.message}` })
   }
})

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete(`/api/dogs/:id`, async (req, res) => {
   try {
      // throw new Error(`no dog found`)
      const { id } = req.params
      const deletedDog = await Dog.delete(id)
      if (!deletedDog) {
         res.status(404).json({ message: `Dog with id:${id} not found` })
      } else {
         res.json({
            message: `Dog with id: ${id} deleted`,
            data: deletedDog
         })
      }
   }
   catch (err) {
      res.status(500).json({ message: `Error deleting dog: ${err.message}` })
   }
})


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server