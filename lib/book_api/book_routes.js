const express = require('express')

// // for this example, we'll use an in-memory array in place of a database
// const books = [
//     { title: 'Dictionary', author: 'Webster' },
//     { title: 'Encyclopedia', author: 'Encarta' },
//     { title: 'Clean Code', author: 'Robert Cecil Martin' }
// ]
// add our database mongo insted of the array
const Book = require('./book_model')
//handle errors
const customErrors = require('./custom_errors')
const handle404 = customErrors.handle404

const router = express.Router() // replace all app with router
// all books
//app.get to router.grt
// to use error handler middleware from the server we need to and next to each parameter and change .catch to (next)
router.get('/books', (req, res, next) => {
    // // send it as object
    // const object = { books: books }
    // // res.status(200).send(JSON.stringify(object))
    // //json
    // as mongoose 
    Book.find()
        .then(books => {
            res.status(200).json({ books: books })
        })
        .catch(next)
})



//one book
router.get('/books/:id', (req, res, next) => {
    //to get the id from the params
    const id = req.params.id
    // // to get the book from the array with that id
    // const book = books[id]
    // // create an object withe book key to yurn into json
    // const object = {
    //     book: book
    // }
    // // send back json og our book and a 200 response
    // // res.status(200).send(JSON.stringify(object))
    // // json by defult
    // mongoose
    Book.findById(id)
        // using the error handle
        .then(handle404)
        .then(book => {
            res.status(200).json({ book: book })
        })
        .catch(next)


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
router.post('/books', (req, res, next) => {
    // body comes after we used bodyParser
    const newBook = req.body.book
    // // add to array
    // books.push(newBook)
    // mongoose
    Book.create(newBook)
        .then(book => {
            // show the new book 201 succss create 
            res.status(201).json({ book: book })
        })
        .catch(next)
})

router.delete('/books/:id', (req, res, next) => {
    const id = req.params.id

    Book.findByIdAndRemove(id)
        .then(handle404)
        // .then(res.send({ message: "Note deleted successfully!" }))
        // or
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)

})


router.put('/books/:id', (req, res, next) => {
    const id = req.params.id
    const updatedBook = req.body.book
    Book.findByIdAndUpdate(id, updatedBook, { new: true })
        .then(handle404)
        .then(book => {
            res.status(200).json({ book: book })
        })
        .catch(next)
})

// export router to use it in server
module.exports = router





// // mike code 
// const express = require('express')
// const Book = require('./book_model')

// const router = express.Router()

// router.get('/books', (request, response) => {
//     Book.find()
//     .then(books => {
//       response.status(200).json({books: books})
//     })
//     .catch(error => console.log(error))
// })

// router.get('/books/:id', (req, res) => {
//       // get the ID from the params
//       const id = req.params.id
//       Book.findById(id)
//       .then(book => {
//         res.status(200).json({book: book})
//       })
//       .catch(error => console.log(error))
// })

// router.post('/books', (req, res) => {
//     const newBook = req.body.book
//     Book.create(newBook)
//     .then( book => {
//       res.status(201).json({ book: book })
//     })
//     .catch(error => console.log(error))
// })

// router.delete('/books/:id', (req, res) => {
//   const id = req.params.id 
//   Book.findByIdAndRemove(id)
//   .then( () => {
//     res.sendStatus(204)
//   })
//   .catch( error => console.log(error))
// })

// router.put('/books/:id', (req, res) => {
//   const id = req.params.id 
//   const updatedBook = req.body.book
//   Book.findByIdAndUpdate(id, updatedBook, { new: true} )
//   .then( (book) => {
//     res.status(200).json({book: book})
//   })
//   .catch( error => console.log(error))
// })

// module.exports = router