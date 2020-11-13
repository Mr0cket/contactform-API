const express = require('express')
const app = express()
const chalk = require('chalk')
require('dotenv').config()
cors = require('cors')
app.use(cors())
port = 666
// import routes
const httpsOptions = {
    
}
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
    res.status(404).send('there is no endpoint at this directory')
})
// will get this data from front end ContactForms

app.listen(port,() => console.log(`server is live on: \n  ${chalk.blue(`http://localhost:${port}`)} &\n ${chalk.blue(`http://192.168.1.2:${port}`)} `))

// sequelize.close() - executed automatically when process terminates. (only needed to manually execute when creating multiple instances and need garbage collection)