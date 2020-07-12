'use strict'

const Tag = require('../models/tag')

const getTags = (req,res) => {
    let filter = {}
    if(req.query.name){
        filter.name = new RegExp(req.query.name,'i')
    }
    Tag.find(filter).exec( (err,tag) => {
        if(err){
            return res.status(400).send({status:'error', message : err.message})
        }
        return res.status(200).send({status:'ok', tags: tag })
    })
    
}

const saveTag = ( req, res ) => {
    let params = req.body
    
    
    if(!params.tag){
        return res.status(400).send({status:'error', message : 'No ha enviado los parametros requeridos'})
    }
    let newTag = new Tag(params)
    newTag.save( (err,tagSaved) => {
        if(err){
            return res.status(400).send({status:'error', message : err.message})
        }
        if(!tagSaved){
            return res.status(400).send({status:'error', message : 'Se presentó un inconveninte al cargar el Tag '})
        }else{
            return res.status(200).send({status:'ok', tags: tagSaved })
        }
    })

}

const getTag = (req,res) => {
    let tag = req.params.id
    res.status(200).send({status:'ok',tag})
}

module.exports = {
    getTags,
    getTag,
    saveTag
}