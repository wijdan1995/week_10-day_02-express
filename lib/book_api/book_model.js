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
    }
}, {
        timestamps: true
    })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book