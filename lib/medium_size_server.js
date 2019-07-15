const express = require('express')
// middleware bettwen the requset and my stuff
const bodyParser = require('body-parser')

// for this example, we'll use an in-memory array in place of a database
const books = [
  { title: 'Dictionary', author: 'Webster' },
  { title: 'Encyclopedia', author: 'Encarta' },
  { title: 'Clean Code', author: 'Robert Cecil Martin' }
]

// your code goes here!
const app = express()
// using bodyparser in my req
app.use(bodyParser.json())
// all books
app.get('/books', (req, res) => {
  // send it as object
  const object = { books: books }
  // res.status(200).send(JSON.stringify(object))
  //json
  res.status(200).json(object)
})
//one book

app.get('/books/:id', (req, res) => {
  //to get the id from the params
  const id = req.params.id
  // to get the book from the array with that id
  const book = books[id]
  // create an object withe book key to yurn into json
  const object = {
    book: book
  }
  // send back json og our book and a 200 response
  // res.status(200).send(JSON.stringify(object))
  // json by defult
  res.status(200).json(object)

  //   // or shortcut
  //   res.status(200).send(JSON.stringify({
  //     book: books[req.params.id]
  //   }))
})

//post
// postman > body > raw > json 
// {
// 	"book": {
// 		"title": "new book",
// 		"author": "new author"
// 	}
// }
app.post('/books', (req, res) => {
  // body comes after we used bodyParser
  const newBook = req.body.book
  // add to array
  books.push(newBook)
  // show the new book 201 succss create 
  res.status(201).json(newBook)
})

// the port to listen
app.listen(3000, () => console.log('Running on port 3000'))