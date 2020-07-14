'use strict'

const express = require('express')
const tagsController = require('../controllers/tags')

const { ensureAuth } = require('../middlewares/authenticated')

const api = express.Router()


api.get('/tag', tagsController.getTags)
api.get('/tag/:id', tagsController.getTag)
api.post('/tag',[ensureAuth],tagsController.saveTag)
api.put('/tag/:id',[ensureAuth], tagsController.updateTag)

module.exports = api