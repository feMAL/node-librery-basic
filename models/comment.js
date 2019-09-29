'use strict'

let moongose = require('mongoose');
let Schema = moongose.Schema();

let commentModel = Schema({
    comment: { type: String, require:true },
    date : { type: String, require:true },
    valoration: { type: Number, require:true },
    user: { type: Schema.ObjectId, ref:'user' }
})

exports.module = moongose.model('comment', commentModel);