'use strict'

let moongose = require('mongoose');
let Schema = moongose.Schema();

let fragmentModel = Schema({
    fragment: { type: String, require:true },
    chapter : String,
    valoration: Number
})

exports.module = moongose.model('comment', commentModel);