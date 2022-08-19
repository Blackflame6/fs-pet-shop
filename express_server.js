const express = require('express')

const app = express()

const PORT = 8000

app.get('/test', (req, res)  => {
 
  res.send('get test page working')
})

app.get('/', (req, res) => {
  res.send('get home page working')
})
app.post('/test', (req, res) => {
  res.send('post test page working')
}) 
app.post('/', (req, res) => {

res.send('post home page working')
})
app.listen (PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})