import express from 'express'
import mongoose from 'mongoose'
import Videos from './dbModel.js'
import dotenv from 'dotenv'

dotenv.config()

// app config
const app = express()
const port = process.env.PORT || 9000

// middlewares
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    next()
})

// DB config
const connection_url = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.pplcf.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
mongoose.connect(connection_url)

// API endpoints
app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))
