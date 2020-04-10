'use strict'

var express = require('express');
var UserController = require('../controllers/user');


var api = express.Router();
var md_auth = require('../middlewares/authenticated')

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: '../upload/users'})

//api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/singup', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser)
api.post('/upload-user-image/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage)
api.get('/get-user-image/:imageFile',UserController.getImageFile)

module.exports = api;
