import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import { welcomeMsg } from './constant.js';
import mongoose from 'mongoose';


dotenv.config();

const app = express()

// set limit & corss origin access
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// define routes
app.use('/user', userRoutes);

// api root path
app.get('/', (req, res) => {
    res.send(`${welcomeMsg.message} v${welcomeMsg.version}`);
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening requests on port ' + process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })