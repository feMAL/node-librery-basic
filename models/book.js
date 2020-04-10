'use strict'

let mongoose = require('mongoose');
var	Schema = mongoose.Schema;


let bookModel = mongoose.Schema({
    title: { type: String, require: true},
    category: { type: Schema.ObjectId, ref: 'Category', require: true },
    autor: { type: Schema.ObjectId, ref: 'Autor', require: true },
    tags: { type: Schema.ObjectId, ref: 'Tag'},
    monthPublished: Number,
    yearPublished: Number,
    editorial: { type: Schema.ObjectId, ref: 'Editorial', require: true },
    pages: Number,
    isbn13: { type: String, require: true},
    briefDescription: String,
    sinopsis: String,
    linkAmazon: String,
    linkCasadeLibro: String,
    fragment: { type: Schema.ObjectId, ref: 'Fragment'},
    comments: { type: Schema.ObjectId, ref: 'Comments'},
    imageFront: String,
    imageBack: String
});

module.exports = mongoose.model('Book', bookModel);