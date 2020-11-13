console.log('imported mail router')
const express = require('express')
const _ = require('lodash');

// import express-formidable to parse formData!  
const formidable = require('express-formidable');
const { ContactForm, sequelize } = require('../database/db');

//create an instance of express Router to handle all requests to the specified endpoint.
const router = express.Router()

router.use(formidable())
// Specify that the router uses middleware 'express-formidable' to pre-parse request body.

{// specify an action for every request method for reqs that hit this endpoint
// GET, HEAD, OPTIONS, TRACE => Safe Methods - should only retrieve data and should not change state of server.

// POST, PUT, DELETE, PATCH => actions that may cause changes to API/server/database state.
// or changes in state of another API (when the req. triggers a call to another api.)

/*  Methods PUT and DELETE are idempotent - multiple requests should have the same effect as single request. */
/* // contactForm.sync is used to sync a sequelize model to a table in the database, making sure all of the properties in the model align with fields in the table.
// if the table doesn't exist, sync will create a new table in the database. */}

// GET
router.get('/', (req, res) => {
    console.log('GET req => /contacts')
    sequelize.sync()
        .then( () => ContactForm.findAll())
            .then( forms => res.json(forms))
})


// POST - requests that the server accept the entity enclosed in the request as a new sub-entry (data entry) of the API.
router.post('/', (req, res) => {
    console.log(`POST req => '/contacts'`)
    if (_.isEmpty(req.fields)) {
        res.status(400).json({ message: 'empty/bad request'})
    } else {
        sequelize.sync()
            .then( () => ContactForm.create(req.fields))
                .then( form => res.status(200).json(form))
                    .catch( e => console.error(`form not saved: \n${e}`))
    }
})
router.patch('/', (req, res) => {
    console.log('PATCH => "/contacts/"')
    res.send({message: 'please enter the contactForm id after /articles/'})
})

// PATCH - update a contactForm comment
router.patch(('/:id'), (req, res) => {
    console.log(`PATCH req => '/contacts/${req.params.id}'`)
    if (_.isEmpty(req.fields)) {
        res.status(400).json({message: 'empty/bad request'})
    } else {
        sequelize.sync()
            .then( () => ContactForm.update({
                message: req.fields.message
            }, { where: {
                    id: req.params.id
                }
            })).then( form => res.json([form, 'form updated.']) )
            .catch( e => {
                console.error(`couldn't update commentForm ${req.params.id}. \n ${e}`)
                res.status(400).json({ message: `bad request - commentForm id:${req.params.id} doesn't exist.`})
            })
    }
})

// DELETE - delete a contactForm comment
router.delete(('/:id'), (req, res) => {
    console.log(`DELETE req => '/contacts/${req.params.id}`)
    sequelize.sync()
        .then( () => ContactForm.destroy({
            where: {
                id: req.params.id
            }
        })).then(() => {
            console.log(`comment ${req.params.id}`)
            res.send({message: `${req.params.id} deleted successfully`})
        })
        .catch( e => {
            console.error(`couldn't update commentForm ${req.params.id}. \n ${e}`)
            res.status(400).json({ message: `bad request - commentForm id:${req.params.id} doesn't exist.`})
        })
})
// 

// view a previously sent message...?

// delete a previously sent message...?

// login with a username & pw ??
// username persistence every time the same client visits the site.

// export default router (can be imported: const <any-name> = require('./routes/mail');) */
module.exports = router