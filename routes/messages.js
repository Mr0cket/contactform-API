const express = require('express')
const router = express.Router()

console.log('calling messages router')

// My routes, and what operations I need to perform.

// store contactforms sent via POST request in database.
router.post('/', (req, res) => {
    res.send('hello Milo')
})
// view a previously sent message...?

// delete a previously sent message...?

// login with a username & pw ??
// username persistence every time the same client visits the site.
module.exports = router
