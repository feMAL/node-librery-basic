'use strict'

let express = require('express');
let bodyparser = require('body-parser');

var app = express();

//cargar rutas

let route_autor = require('./routes/autor');
let route_category = require('./routes/category');
let route_editorial = require('./routes/editorial');
let route_book = require('./routes/book');

// Parsear la IO del app en JSON
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// Configurar Headers

//Raiz del api
app.use('/api', [route_autor,route_category,route_editorial,route_book]);

//Exportar moulo 
module.exports = app;