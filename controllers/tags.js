'use strict'

const Tag = require('../models/tag')

const getTags = ( req, res ) => {
    let filter = {}
    if(req.query.tag){
        filter.tag = new RegExp(req.query.tag,'i')
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
    let filter = {}
    if(tag!=null){
        filter._id = tag
        Tag.findOne(filter).exec( (err,tag) => {
            if(err){
                return res.status(400).send({status:'error', message : err.message})
            }
            return res.status(200).send({status:'ok', tag })
        })
    }else{
        return res.status(400).send({status:'error', message : 'No ha enviado los parametros requeridos'})
    }
}

const updateTag = ( req, res ) => {
    let tag = req.params.id
    let argments = req.body

    if(tag){
        if(argments.tag){
            Tag.findByIdAndUpdate( tag, argments, (err,tagUpdated)=>{
                if(err){
                    return res.status(400).send({status:'error', message : err.message})
                }else{
                    if(!tagUpdated){
                        return res.status(404).send({status:'error', message : 'El registro actualizado no ha sido encontrado'})
                    }
                    return res.status(200).send({status:'ok', tagUpdated })
                }
            })
        }else{
            return res.status(400).send({status:'error', message : 'No ha enviado todos parametros requeridos'})
        }
    }else{
        return res.status(400).send({status:'error', message : 'No ha enviado todos parametros requeridos'})
    }


}

module.exports = {
    getTags,
    getTag,
    saveTag,
    updateTag
}