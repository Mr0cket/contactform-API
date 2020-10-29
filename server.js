const http = require('http');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 666

// dotenv.config() - loads the .env file contents into process.env
require('dotenv').config()
// any variable in .env is accessible via process.env.<variableName>

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(`database error: ${error}`))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const messagesRouter = require('./routes/messages')
app.use('/messages', messagesRouter)

app.listen(port, () => console.log(`server started on http://localhost:${port}`));
 


// need to implement CORS policy: Access-Control-Allow-Origin' header 
// need to implement what to do with content in the request
// express.js server cors policy implementation code:
/* server.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 'origin, X-requested-with, Content-Type, Accept');
    next()
}) */
// presumably when I use fetch to 'http://localhost:666' it will hit this server.
// if use a 'post' in the client request header, and I use logic on server to check for 'post' header,
// I can tell the server what to do with the body of the request (which will hopefully be the JSON form data!)
// when it recieves the post request(with content.)
