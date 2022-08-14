import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import user from './routes/user.js'
import video from './routes/video.js'
import topic from './routes/topic.js'
import { welcomeMsg } from './constant.js'
import mongoose from 'mongoose'


dotenv.config()

const app = express()

// set limit & corss origin access
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// define routes
app.use('/user', user)
app.use('/video', video)
app.use('/topic', topic)

// api root path
app.get('/', (req, res) => {
    res.send(`${welcomeMsg.message} v${welcomeMsg.version}`)
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('LearnApp is connected to DB and start listening requests on port ' + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })