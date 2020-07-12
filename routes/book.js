'use strict'

let express = require('express');
var bookController = require('../controllers/book')
var { ensureAuth } = require('../middlewares/authenticated')

let api = express.Router();

// APISss

api.get('/book/:id?', bookController.getBook);
api.post('/book/:autor', bookController.getBookByAutor);
api.post('/book', [ ensureAuth ] , bookController.saveBook);
api.put('/book/:id', [ ensureAuth ], bookController.updateBook);

/*api.get('/categorys/:page?', categoryController.getCategorys);
api.delete('/category/:idAutor', categoryController.deleteCategory);*/

module.exports = api;
