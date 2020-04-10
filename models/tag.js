'use strict'

let mongoose = require('mongoose');

let tagsSchema = mongoose.Schema({
    tag: { type: String, require:true },
    description: String
});

module.exports = mongoose.model('Tag', tagsSchema);
