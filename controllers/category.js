'use strict'

var Category = require('../models/category');
var pagination = require('mongoose-pagination')

//controlador de Categorias

// Obtener una categoria de la DB con el ID Recibido.
let getCategory = (req,res) => {
    let categoryId = req.params.id;

    Category.findById(categoryId,(err,findit)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registro'});
            throw err
        }else{
            if(!findit){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({category : findit})
            }
        }
    });
}

// Obtener los categoria de la DB con depediendo la cantidad de paginas solicitadas
let getCategorys = (req,res) => {
    if(req.params.page){
        var pages = req.params.page;
    }else{
        var pages = 1;
    }
    var itemsPerPage = 5
    Category.find().sort('name').paginate(pages,itemsPerPage,(err,categorys,tot)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registros'});
            throw err
        }else{
            if(!categorys){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({
                    amount : tot,
                    pages: pages,
                    categorys: categorys
                });
            }
        }
    });
}

// guardar un nueva categoria
let saveCategory = (req,res) => {
    var category = new Category();
    let params = req.body;

    category.name = params.name;
    category.description = params.description;
    category.dependency = params.dependency;

    if(!category.name){
        res.status(404).send({message: 'El campo nombre de la categoria es requerido para dar de alta el registro'})
    }else{
        Category.findOne({name: category.name},(err,findit)=>{
            if(err){
                res.status(404).send({message: 'Incidente al cargar un registro'});
            }else{
                if(!findit){
                    category.save({category},(err, savedCategory)=>{
                        if(err){
                            res.status(404).send({message: 'Error al dar de alta el registro'});
                        }else{
                            if(!savedCategory){
                                res.status(404).send({message: 'El registro no se guardo correctamente'});
                            }else{
                                res.status(200).send({newCategory: savedCategory});
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

// Actualizar una categoria
let updateCategory = (req,res) => {
    var idCategory = req.params.idCategory;
    var values = req.body;
    if(!idCategory){
        res.status(200).send({message: "No ha enviado el id del autor que desea actualizar"});
    }else{
        Category.findByIdAndUpdate(idCategory,values,(err,categoryUpdated)=>{
            if(err){
                res.status(404).send({message: 'Error al actualizar el registro'});
            }else{
                if(!categoryUpdated){
                    res.status(404).send({message: 'Registro no actualizado'});
                }else{
                    res.status(200).send({categoryUpdated: categoryUpdated});
                }
            }
        })
    }
}

module.exports = {
    saveCategory,
    getCategory,
    getCategorys,
    updateCategory
}