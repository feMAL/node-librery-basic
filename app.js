'use strict'

let express = require('express');
let bodyparser = require('body-parser');

var app = express();

//cargar rutas

let route_user = require('./routes/user');
let route_autor = require('./routes/autor');
let route_category = require('./routes/category');
let route_editorial = require('./routes/editorial');
let route_book = require('./routes/book');

// Parsear la IO del app en JSON
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// Configurar Headers

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With,Content-Type,Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
    res.header('Allow','GET,POST,PUT,DELETE,OPTIONS')

    next();
})

//Raiz del api
app.use('/api', [route_autor,route_category,route_editorial,route_book,route_user]);

//Exportar moulo 
module.exports = app;