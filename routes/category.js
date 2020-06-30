'use strict'

let express = require('express');
var categoryController = require('../controllers/category')

let api = express.Router();

// APISss

api.post('/category', categoryController.saveCategory);
api.get('/category/:id', categoryController.getCategory);
api.get('/category', categoryController.getCategorys);
api.put('/category/:idCategory', categoryController.updateCategory);
/*api.delete('/category/:idAutor', categoryController.deleteCategory);*/

module.exports = api;

