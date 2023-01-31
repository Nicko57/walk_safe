require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)

// connect to db
if (process.env.NODE_ENV === 'test') {
  mongodbUrl = process.env.TEST;
} else {
  mongodbUrl = process.env.MONGO_URI;
}

mongoose.connect(mongodbUrl)
  .then(() => {
    // listen for requests
    console.log(mongodbUrl)
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })

module.exports = app;