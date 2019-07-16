const express = require('express')
const Movie = require('./movie_model')

const customErrors = require('./custom_errors')
const handle404 = customErrors.handle404

const router = express.Router()

router.get('/movies', (req, res, next) => {
    Movie.find()
        .then(movies => {
            res.status(200).json({ movies: movies })
        })
        .catch(next)
})

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
        .then(handle404)
        .then(movie => {
            res.status(200).json({ movie: movie })
        })
        .catch(next)
})

router.post('/movies', (req, res, next) => {
    const newMovie = req.body.movie
    Movie.create(newMovie)
        .then(movie => {
            res.status(201).json({ movie: movie })
        })
        .catch(next)
})

router.delete('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndRemove(id)
        .then(handle404)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(next)
})

router.put('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndUpdate(id, req.body.movie, { new: true })
        .then(handle404)
        .then(movie => {
            res.status(200).json({ movie: movie })
        })
        .catch(next)
})


module.exports = router