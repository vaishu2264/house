const express = require('express')
const mongoose = require('mongoose')
//const userroutes = require('./routes/userroutes')
const loginroutes = require('./routes/loginroutes')
const app = express()
const PORT=5000;

const cors = require('cors');
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)

mongoose.connect('mongodb://localhost:27017/')
.then(()=>{
    console.log('Connection established')
})
.catch((err)=>{
    console.log('error connecting to database',err.message)
})

app.use(express.json())
//app.use(userroutes)
app.use(loginroutes)


app.listen(PORT,()=>{
    console.log('app is serving')
})