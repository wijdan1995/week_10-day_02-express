const express = require('express')
// add auth
const passport = require('passport')
const requireToken = passport.authenticate('bearer', { session: false })

// // for this example, we'll use an in-memory array in place of a database
// const books = [
//     { title: 'Dictionary', author: 'Webster' },
//     { title: 'Encyclopedia', author: 'Encarta' },
//     { title: 'Clean Code', author: 'Robert Cecil Martin' }
// ]
// add our database mongo insted of the array
const Book = require('./book_model')
const User = require('./user_model')
//handle errors
const customErrors = require('./custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const router = express.Router() // replace all app with router
// all books
//app.get to router.grt
// to use error handler middleware from the server we need to and next to each parameter and change .catch to (next)
// requireToken we add it to make it only the sign-in user see it
router.get('/books', requireToken, (req, response, next) => {
    User.findById(req.user.id)
        .populate('books')
        .then(user => {
            // books = books.filter(book => {
            //   if (!book.owner) {
            //     return false
            //   }
            //   return book.owner.equals( req.user._id)
            // })
            response.status(200).json({ books: user.books })
        })
        .catch(next)
})



//one book
router.get('/books/:id', requireToken, (req, res, next) => {
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
            requireOwnership(req, book)
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


router.post('/books', requireToken, (req, res, next) => {
    // body comes after we used bodyParser
    const newBook = req.body.book
    // add realation with user
    newBook.owner = req.user.id
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

router.delete('/books/:id', requireToken, (req, res, next) => {
    const id = req.params.id

    // Book.findByIdAndRemove(id)
    Book.findById(id)
        .then(handle404)
        .then(book => {
            //using error 
            requireOwnership(req, book)
            return book.remove()
        })
        // .then(res.send({ message: "Note deleted successfully!" }))
        // or
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)

})

// add realation with user
router.put('/books/:id', requireToken, (req, res, next) => {
    // protect owner to not be send 
    delete req.body.book.owner


    const id = req.params.id
    const updatedBook = req.body.book
    // Book.findByIdAndUpdate(id, updatedBook, { new: true })
    Book.findById(id)
        .then(handle404)
        .then(book => {
            //using error 
            requireOwnership(req, book)
            return book.update(updatedBook)
        })
        .then(book => res.status(200).json({ book: book }))
        .catch(next)
})

// export router to use it in server
module.exports = router



// mike's code with user and auth

// const express = require('express')

// const passport = require('passport')
// const requireToken = passport.authenticate('bearer', { session: false })

// const Book = require('./book_model')
// const User = require('./user_model')

// const customErrors = require('./custom_errors')
// const handle404 = customErrors.handle404 
// const requireOwnership = customErrors.requireOwnership 

// const router = express.Router()

// router.get('/books', requireToken, (req, response, next) => {
//     User.findById(req.user.id)
//     .populate('books')
//     .then(user => {
//       // books = books.filter(book => {
//       //   if (!book.owner) {
//       //     return false
//       //   }
//       //   return book.owner.equals( req.user._id)
//       // })
//       response.status(200).json({books: user.books})
//     })
//     .catch(next)
// })

// router.get('/books/:id', requireToken, (req, res, next) => {
//       // get the ID from the params
//       const id = req.params.id
//       Book.findById(id)
//       .then(handle404)
//       .then(book => {
//         requireOwnership(req, book)
//         res.status(200).json({book: book})
//       })
//       .catch(next)
// })

// router.post('/books', requireToken, (req, res, next) => {
//     const newBook = req.body.book
//     newBook.owner = req.user.id
//     Book.create(newBook)
//     .then( book => {
//       res.status(201).json({ book: book })
//     })
//     .catch(next)
// })

// router.delete('/books/:id', requireToken, (req, res, next) => {
//   const id = req.params.id 
//   Book.findById(id)
//   .then( (book) => {
//     requireOwnership(req, book)
//     return book.remove()
//   })
//   .then( () => {
//     res.sendStatus(204)
//   })
//   .catch(next)
// })

// router.put('/books/:id', requireToken, (req, res, next) => {
//   delete req.body.book.owner

//   const id = req.params.id 
//   const updatedBook = req.body.book
//   Book.findById(id)
//   .then( (book) => {
//     requireOwnership(req, book)
//     return book.update(updatedBook)
//   })
//   .then( book => res.status(200).json({book: book}))
//   .catch(next)
// })

// module.exports = router




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