'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema();

let userSchema = Schema({
    username: { type: String, require:true },
    email: { type: String, require:true },
    password: { type: String, require:true },
    expirience: Number,
    frase: String,
    role: String,
    image: String,
});

exports.module = mongoose.model('user', userSchema);
