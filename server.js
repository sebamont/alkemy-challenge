const express = require('express');
const dotenv = require('dotenv');
//Colors lib help us read faster the console.
// Color reference: Cyan=success, red=error
const colors = require('colors')

//importing db connection config
const connectCloudMongoDB = require('./config/db');


dotenv.config({path: './config/config.env'});

const app = express();

connectCloudMongoDB();

const movements = require('./routes/movements.js');

// this is necessary for POST and PUT methods.
app.use(express.json());


app.use('/api/movements',movements);


const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`.cyan);
});