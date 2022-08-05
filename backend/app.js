import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';


const app = express()

// set limit & corss origin access
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// define routes
app.use('/user', userRoutes);

// api root path
app.get('/', (req, res) => {
    res.send("Welcome to Learning API.");
});

app.listen(4000, () => {
    console.log('Listening requests on port 4000')
})