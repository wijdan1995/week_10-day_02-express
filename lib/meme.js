const express = require('express')
const bodyParser = require('body-parser')
const app = express()

let memes = [
    {
        "id": 1,
        "title": "Angry",
        "image": "http://imgur.com/kH6o0mN.png"
    },
    {
        "id": 2,
        "title": "Aww Yeah",
        "image": "http://imgur.com/vTSZ6CG.png"
    },
    {
        "id": 3,
        "title": "Cereal Guy",
        "image": "http://imgur.com/SjnMMhd.png"
    }
]

app.use(bodyParser.json())
//get all
app.get('/memes', (req, res) => {
    const object = { memes: memes }
    res.status(200).json(object)
})

//get one with id
app.get('/memes/:id', (req, res) => {
    //get id from params
    const id = parseInt(req.params.id)
    // get the meme with that id
    const meme = memes.find(meme => meme.id === id)
    // convert it to object
    const object = {
        meme: meme
    }
    res.status(200).json(object)
})

//create meme
app.post('/memes', (req, res) => {
    const newMeme = req.body.meme
    // id increasing of the array
    const id = memes[memes.length - 1].id + 1;
    newMeme.id = id
    memes.push(newMeme)
    res.status(201).json(newMeme)
})

//delete
app.delete('/memes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // let memeCopy = memes.slice()
    // memes = memeCopy.filter(filterdMeme => {
    //     return filterdMeme.id !== id
    // })
    const memeCopy = memes.filter(filterdMeme => filterdMeme.id !== id)
    memes = memeCopy
    // res.status(201).json("Delete request done")
    res.sendStatus(204)
})

//update put for every thing or patch for one thing
app.put('/memes/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // const updateMeme = req.body.meme
    // let memeCopy = memes.slice()
    // memes = memeCopy.map(meme => {
    //     if (meme.id === id)
    //         meme = updateMeme
    //     return meme
    // })
    const index = memes.findIndex((meme) => meme.id === id)
    const updateMeme = req.body.meme
    updateMeme.id = id
    memes[index] = updateMeme
    res.status(200).json(updateMeme)
})




app.listen(3000, () => console.log('Running on port 3000'))