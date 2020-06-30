'use strict'

const Tag = require('../models/tag')

const getTags = (req,res) => {
    let filter = {}
    if(req.query.name){
        filter.name = req.query.name
    }
    Tag.find(filter).exec( (err,tag) => {
        if(err){
            return res.status(200).send({status:'error', message : err.message})
        }
        return res.status(200).send({status:'ok', tags: tag })
    })
    
}

const getTag = (req,res) => {
    let tag = req.params.id
    res.status(200).send({status:'ok',tag})
}

module.exports = {
    getTags,
    getTag
}