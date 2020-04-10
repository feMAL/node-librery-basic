'use strict'

let mongoose = require('mongoose');
var	Schema = mongoose.Schema;

let sliderHomeBookModel = mongoose.Schema({
    title: { type: String, require: true},
    image: { type: String, require: true},
    category: { type: Schema.ObjectId, ref: 'Category', require: true },
    sinopsis: {type: String, require: true},
});

module.exports = mongoose.model('SliderHomeBook',sliderHomeBookModel);