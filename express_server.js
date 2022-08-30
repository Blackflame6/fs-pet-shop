const fs = require('fs')
const express = require('express')
const { json } = require('express')
const app = express()
const PORT = process.env.PORT || 9000

 app.get('/pets', (req, res) => {
   fs.readFile('pets.json', 'utf-8', (error, data) => {
     if (error) {
       console.log(error)
      }
      const objData = JSON.parse(data)
      res.status(200).send(objData)
    })
  
  })


app.get('/pets/:id', (req, res) => {
  id = req.params.id
  fs.readFile('pets.json', 'utf-8', (error, data) => {

    if (error) {
      console.log(error)
    }
    const objData = JSON.parse(data)
  

    res.status(200).send(objData[id])
  })
  const pet = req.url.split('/')
  const lastIndex = pet[pet.length-1]
  const parsedIndex = JSON.stringify(lastIndex)


console.log(parsedIndex.length)
if (id >= parsedIndex.length - 1) {
  res.status(404).send(`Error 404! Input ${parsedIndex} too large, please go lower.`)
 } else if (id < parsedIndex.length- 3) {
  res.status(404).send(`Error 404! Input ${parsedIndex} too small, please go higher.`)

 }
})

app.listen(PORT,()=> {
  console.log(`Listening on Port: ${PORT}`)
})














