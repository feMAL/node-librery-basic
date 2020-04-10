'use strict'

let moongose = require('mongoose');

let editorialModel = moongose.Schema({
    name: {type: String, require:true},
    description: String,
    url: String,
    contact: String,
    logo: String
})

module.exports = moongose.model('Editorial',editorialModel)