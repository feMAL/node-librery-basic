'use strict'

const express = require('express')
const tagsController = require('../controllers/tags')

const api = express.Router()


api.get('/tag', tagsController.getTags)
api.get('/tag/:id', tagsController.getTag)

module.exports = api