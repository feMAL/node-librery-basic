'use strict'

let express = require('express');
var bookController = require('../controllers/book')

let api = express.Router();

// APISss

api.post('/book', bookController.saveBook);
api.get('/book/:id', bookController.getBookById);
api.get('/bookbytitle/:title', bookController.getBookByTitle);
api.put('/book/:id', bookController.updateBook);
/*api.get('/categorys/:page?', categoryController.getCategorys);
api.delete('/category/:idAutor', categoryController.deleteCategory);*/

module.exports = api;
