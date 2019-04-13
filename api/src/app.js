const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// const mongoose = require('mongoose')
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('morgan')('dev'))

// mongoose.connect('mongodb://localhost/just-gd-storage')
// mongoose.set('debug', true)
// const { connection } = mongoose
// connection.on('error', console.error.bind(console, 'connection error:'))
// connection.once(
//   'open',
//   console.error.bind(console, 'db connected successfully'),
// )

app.use(require('./routes'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
