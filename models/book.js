'use strict'

let mongoose = require('mongoose');
var	Schema = mongoose.Schema;


let bookModel = mongoose.Schema({
    title: { type: String, require: true},
    category: { type: Schema.ObjectId, ref: 'category', require: true },
    autor: { type: Schema.ObjectId, ref: 'autor', require: true },
    tags: { type: Schema.ObjectId, ref: 'tag'},
    monthPublished: Number,
    yearPublished: Number,
    editorial: { type: Schema.ObjectId, ref: 'editorial', require: true },
    pages: Number,
    isbn13: {type: String, require: true},
    briefDescription: String,
    sinopsis: String,
    linkAmazon: String,
    linkCasadeLibro: String,
    fragment: { type: Schema.ObjectId, ref: 'fragment'},
    comments: { type: Schema.ObjectId, ref: 'comments'},
    imageFront: String,
    imageBack: String
});

module.exports = mongoose.model('book', bookModel);