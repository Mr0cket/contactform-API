const express = require('express');
const formiddable = require('express-formidable');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const port = process.env.PORT || 666;

// enable CORS policy for all requests!
// CORS is express middleware!
const cors = require('cors');
// set cors options

app.use(cors());
console.log('cors is enabled')

// dotenv.config() - loads the .env file contents into process.env
require('dotenv').config()
// any variable in .env is accessible via process.env.<variableName>

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.error(`database error: ${error}`))
db.once('open', () => console.log('connected to database'))

// .use = middleware that allows you to run code to parse the request and response automatically,
//  before it is passed to the requested route.
//  express .use(middleWare) equivalent to http.createServer(requestListener)
// however, .use() can be call as many times as needed.
// app.use(formiddable());

// import mail.js express.router function (router) as mailRouter.
const mailRouter = require('./routes/mail');

// create the api endpoint /mail to handle all calls to localhost:666/mail.
app.use('/mail', mailRouter);
app.use('/', (req, res) => {
        res.status(200).json({message: 'call /mail for true api'})
})

app.listen(port, () => console.log(`server started on http://localhost:${port}`));
 

// app/server.use() a way of passing callback functions when a response is received.

/* server.use(function(req, res, next){
        next()
}) */
// presumably when I use fetch to 'http://localhost:666' it will hit this server.
// when I use fetch to 'http://localhost:666/mail/', it will hit the mail route.
// if use a 'post' in the client request header, and I use logic on server to check for 'post' header,
// I can tell the server what to do with the body of the request (which will hopefully be the JSON form data!)
// when it recieves the post request(with content.)
