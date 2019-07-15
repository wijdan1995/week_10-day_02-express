//import expree laibrary
const express = require('express')

// if i want to change the port
const port = 3000

// create express app using the express as functuion
const app = express()
// the request and response for home page
app.get('/', (request, ressponse) => ressponse.send('Hello World!'))

// books route
app.get('/books', (request, ressponse) => ressponse.send('Read More Books'))
// the app listening on this port
// app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
