const connectToMongo = require('./db');
const express = require('express')
connectToMongo();

const app = express()
const port = 4000

app.use(express.json()) //middle wear

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Khushi!')
})

app.listen(port, () => {
  console.log(`iNotebook Backend listening at http://localhost:${port}`)
})