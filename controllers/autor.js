'use strict'

var Autor = require('../models/autor');
var pagination = require('mongoose-pagination') // <- MONGOOSE PAGINATION
//controlador Autores

let addPoints = (req,res) => {
    var idAutor = req.params.id;
    var pointsAutor = req.params.points;

    if(pointsAutor>5){
        pointsAutor=10;
    }else{
        if(pointsAutor<1){
            pointsAutor=1;
        } 
    }
    Autor.findById(idAutor,(err,findIt)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registros'});
            throw err
        }else{
            if(findIt){
                findIt.points=+pointsAutor;
                findIt.votes++;
                Autor.findByIdAndUpdate(idAutor,findIt,(err,autorUpdated)=>{
                    if(err){
                        res.status(404).send({message: 'Error al actualizar el registro'});
                    }else{
                        if(!autorUpdated){
                            res.status(404).send({message: 'Registro no actualizado'});
                        }else{
                            res.status(200).send({autorUpdated: autorUpdated});
                        }
                    }
                })
            }else{
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }
        } 
    });
}

// Obtener un Autor de la DB con un ID de autor Recibido.
let getAutor = (req,res) => {
    let autorId = req.params.id;

    Autor.findById(autorId,(err,findit)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registro'});
            throw err
        }else{
            if(!findit){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({autor : findit})
            }
        }
    });
}

// Obtener los Autores de la DB con depediendo la cantidad de paginas solicitadas
let getAutors = (req,res) => {
    let filter = {}
    if(req.query.name){
        filter.name = new RegExp(req.query.name,'i')
    }
    if(req.params.page){
        var pages = req.params.page;
    }else{
        var pages = 1;
    }
    
    var itemsPerPage = 20
    Autor.find(filter)
        .sort('name')
        .paginate(pages,itemsPerPage,(err,autors,tot)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registros'});
            throw err
        }else{
            if(!autors){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({
                    amount : tot,
                    pages: pages,
                    autors: autors
                });
            }
        }
    });
}


let saveAutor = (req,res) => {
    var autor = new Autor();
    let params = req.body;

    autor.name = params.name;
    autor.alias = params.alias;
    autor.url = params.url;
    autor.description = params.description;
    autor.nationality = params.nationality;
    autor.votes = 0;
    autor.points = 0;
    autor.image = 'null';

    if(!autor.name){
        res.status(404).send({message: 'El campo nombre del autor es requerido para dar de alta el registro'})
    }else{
        Autor.findOne({name: autor.name},(err,findit)=>{
            if(err){
                res.status(404).send({message: 'Incidente al cargar un registro'});
            }else{
                if(!findit){
                    autor.save({autor},(err, savedAutor)=>{
                        if(err){
                            res.status(404).send({message: 'Error al dar de alta el registro'});
                        }else{
                            if(!savedAutor){
                                res.status(404).send({message: 'El registro no se guardo correctamente'});
                            }else{
                                res.status(200).send({newAutor: savedAutor});
                            }
                        }
                    })
                }else{
                    res.status(404).send({message: 'El autor ingresado ya existe'});
                }
            }
        })
    }
}

let updateAutor = (req,res) => {
    var idAutor = req.params.idAutor;
    var values = req.body;
    if(!idAutor){
        res.status(200).send({message: "No ha enviado el id del autor que desea actualizar"});
    }else{
        Autor.findByIdAndUpdate(idAutor,values,(err,autorUpdated)=>{
            if(err){
                res.status(404).send({message: 'Error al actualizar el registro'});
            }else{
                if(!autorUpdated){
                    res.status(404).send({message: 'Registro no actualizado'});
                }else{
                    res.status(200).send({autorUpdated: autorUpdated});
                }
            }
        })
    }
}

module.exports = {
    saveAutor,
    getAutor,
    getAutors,
    updateAutor,
    addPoints
}