'user strict'

let express = require('express');
let autorController = require('../controllers/autor');

let middleware = require('../middlewares/authenticated')

let api = express.Router();

//URI's
api.post('/autor', [middleware.ensureAuth] , autorController.saveAutor);
api.get('/autor/:id', autorController.getAutor);
api.get('/autor', autorController.getAutors);
api.put('/autor/:idAutor',[middleware.ensureAuth], autorController.updateAutor);
api.put('/autor/:id/point/:points', autorController.addPoints);


module.exports= api;