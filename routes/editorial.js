'use strict'

let express = require('express');
var editorialController = require('../controllers/editorial')

let api = express.Router();

// APISss

api.post('/editorial', editorialController.saveEditorial);
api.get('/editorial/:id', editorialController.getEditorial);
api.get('/editorial', editorialController.getEditorials);
api.put('/editorial/:id', editorialController.updateEditorial);
/*api.delete('/category/:idAutor', categoryController.deleteCategory);*/

module.exports = api;