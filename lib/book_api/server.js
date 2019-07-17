const express = require('express')
// middleware bettwen the requset and my stuff
const bodyParser = require('body-parser')

// import router
const bookRoutes = require('./book_routes')
const movieRoutes = require('./movie_routes')
const userRoutes = require('./user_routes')
// to use mongo as our database
const mongoose = require('mongoose')
const database = require('./config')

// our middleware we made
const requestLogger = require('./requestLogger')
// error Handler
const errorHandler = require('./error_handler')
//auth

const auth = require('./auth')


// to be able to use this. 
mongoose.Promise = global.Promise
// to connect to our database we created
mongoose.connect(database, {
  useMongoClient: true
})
  // to check connection
  .then(() => console.log('Successfully connected to the database'))
  .catch((error) => console.log('Could not connect to the database.', error))
// your code goes here!
const app = express()

// using auth
app.use(auth)

// using bodyparser in my req firt then route
app.use(bodyParser.json())

// our middleware we made
app.use(requestLogger)

//to use the routes
app.use(bookRoutes)
app.use(movieRoutes)
app.use(userRoutes)

//
app.use(errorHandler)

// the port to listen
app.listen(3000, () => console.log('Running on port 3000'))