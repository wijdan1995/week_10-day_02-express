// setup the model to use mongo as database
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // realtionship with user
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
        timestamps: true
    })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book

// // mike's
// const mongoose = require('mongoose')

// const bookSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     owner:  {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// }, {
//     timestamps: true
// })

// const Book = mongoose.model('Book', bookSchema)

// module.exports = Book