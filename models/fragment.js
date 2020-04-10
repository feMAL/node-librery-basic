'use strict'

let moongose = require('mongoose');
let Schema = moongose.Schema();

let fragmentModel = Schema({
    fragment: { type: String, require:true },
    chapter : String,
    valoration: Number
})

module.exports = moongose.model('Fragment', fragmentModel);