const express = require('express')
const app = express()
const chalk = require('chalk')

// http(s) modules & https options (TLS certificates) to authenticate https connection
const http = require('http')
const https = require('https')
const httpsOptions = {
    
}

// env
require('dotenv').config()

// cors 
cors = require('cors')
app.use(cors())

// ports
const httpPort = 80
const httpsPort = 443

// import routes
const ContactsRouter = require('./routes/Contacts')


/* sequelize.authenticate()
    .then( () => console.log('Connection has been established successfully.'))
        .catch((error) => console.error('Unable to connect to the database:', error))
 */
app.use('/contacts', ContactsRouter)

app.route('/')
    .all((req, res) => {
    res.send(`🎉you've reached the root directory!🎉 here - take some virtual 🍰 I deployed it myself.`)
})
app.route(/.*/).all((req,res) => {
    res.status(404).send('No endpoint at this directory')
})
// will get this data from front end ContactForms

http.createServer(app).listen( httpPort, () => console.log(`httpServer is live on: \n  ${chalk.blue(`http://http://172.105.93.205:${httpPort}`)} `))

// https.createServer(app).listen( httpsPort, () => console.log(`httpsServer is live on: \n  ${chalk.blue(`https://http://172.105.93.205:${httpsPort}`)} `))


// sequelize.close() - executed automatically when process terminates. (only needed to manually execute when creating multiple instances and need garbage collection)