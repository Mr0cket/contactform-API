const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});


module.exports = mongoose.model('Contact', mailSchema)