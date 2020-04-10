'use strict'

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: { type: String, require:true },
    email: { type: String, require:true },
    password: { type: String, require:true },
    expirience: Number,
    frase: String,
    role: String,
    image: String,
});

module.exports = mongoose.model('User', userSchema);
