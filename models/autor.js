'use strict'

let mongoose = require('mongoose');

var autorSchema = mongoose.Schema({
    name: { type: String, require:true },
    alias: String,
    url: String,
    description: String,
    nationality: String,
    votes: Number,
    points: Number,
    image: String
})
  
module.exports = mongoose.model( 'autor' , autorSchema );