const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const loginroutes = require('./routes/loginroutes');
const app = express();
const PORT = 5000;
const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection established');
    })
    .catch((err) => {
        console.log('Error connecting to database:', err.message);
    });

app.use('/', loginroutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
    console.log(`App is serving on port ${PORT}`);
});
