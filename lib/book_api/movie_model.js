const mongoose = require('mongoose')

const movieSchems = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    })

const Movie = mongoose.model('Movie', movieSchems)
module.exports = Movie