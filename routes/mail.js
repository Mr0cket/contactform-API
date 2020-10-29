console.log('imported mail router')
const express = require('express')
const _ = require('lodash');

// import express-formidable to parse formData!  
const formidable = require('express-formidable');
const Contact = require('../models/mail');

//create an instance of express Router to handle all requests to the specified endpoint.
const router = express.Router();


// Specify that the router uses middleware 'express-formidable' to pre-parse request body.
router.use(formidable())

// specify an action for every request method for reqs that hit this endpoint
// GET, HEAD, OPTIONS, TRACE => Safe Methods - should only retrieve data and should not change state of server.
// POST, PUT, DELETE, PATCH => used for actions that may cause changes to server state/database, 
// or changes to another source (when the req. triggers a call to another api.)
// Methods PUT and DELETE are idempotent - multiple requests should have the same effect as single request.

async function getContact(req, res, next) {
    try {
        contact = await Contact.findById(req.params.id)
        if (contact == null) {
            return res.status(404).json({ message: 'Cant find Contact'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
    res.contact = contact;
    next();
}

// POST - requests that the server accept the entity enclosed in the request as a new sub-entry (data entry) of the API.
router.post('/', async (req, res) => {
// store contactforms sent via POST request in database.
    console.log(`POST request`)
    console.log(req.fields)
    if (_.isEmpty(req.fields)) {
        res.status(400).json({ message: 'empty/bad request'})
    } else {
    const  contact = new Contact({
        name: req.fields['message[name]'],
        email: req.fields['message[email]'],
        message: req.fields['message[content]']
    })

    try {
        const newContact = await contact.save()
        res.status(201).json(newContact)
        console.log('successfully created contact.')

    } catch (err) {
        console.error(err.message)
        res.status(400).json({ message: err.message})
    }}
    //res.send sends res.body as text/plain. can be parsed with .text()
    // res.json({msg: 'hello'}) sends res.body as 'content-type':'application/json'
})

// GET - The GET method requests a representation of the specified resource => safe method 
// retrieve all messages from database
router.get('/', async (req, res) => {
    console.log(`GET req. retrieving all messages`)

    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

// retrieve one message from database
router.get('/:id', getContact, (req, res) => {
    res.json(res.contact)
})

// PATCH not necessary as messages will not be updated after creation except when deleted.
// but necessary for CRUD and REST api.
router.patch('/:id', getContact, (req, res) => {
    console.log(``)
    res.set(400).json({message: 'contact Forms cannot be updated.'})
})


// DELETE a message from the database
router.delete('/:id', getContact, async (req, res) => {
    console.log(`DELETE req to /mail`);
    try {
        await res.contact.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

// TRACE method can be used as part of cross-site tracing attacks.
// common security advice is to disable this method.

// OPTIONS
router.options('/', (req, res) => {
    console.log(`OPTIONS req to /mail`)
})

// HEAD - asks for a response identical to that of a GET request, but without the response body. 
router.head('/', (req, res) => {
    console.log(`HEAD req to /mail`)
})

// PUT
router.put('/', (req, res) => {
    console.log(`PUT req to /mail`)
})

// CONNECT maybe not necessary




// view a previously sent message...?

// delete a previously sent message...?

// login with a username & pw ??
// username persistence every time the same client visits the site.

// export default router (can be imported: const <any-name> = require('./routes/mail');)
module.exports = router;