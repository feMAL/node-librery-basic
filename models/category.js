'use strict'

let mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
    name : { type: String, require:true },
    description: String,
    dependency: { type: Schema.ObjectId, ref: 'category' }

});

module.exports = mongoose.model('category', categorySchema);
