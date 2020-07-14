'use strict'

let express = require('express');
var editorialController = require('../controllers/editorial')
let { ensureAuth } = require('../middlewares/authenticated')

let api = express.Router();

// APISss

api.post('/editorial',[ensureAuth] , editorialController.saveEditorial);
api.get('/editorial/:id', editorialController.getEditorial);
api.get('/editorial',editorialController.getEditorials);
api.put('/editorial/:id', [ensureAuth], editorialController.updateEditorial);
/*api.delete('/category/:idAutor', categoryController.deleteCategory);*/

module.exports = api;