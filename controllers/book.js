'use strict'

let Book = require('../models/book');
let Autor = require('../models/autor');
let Category = require('../models/category');
var pagination = require('mongoose-pagination');

let getBook = (req,res) => {
    let filter
    let params = req.params.id
        
    if(!req.params.id){
        if(req.query){
            filter = req.query
        }else{
            filter = {}
        }
    }else{
        filter = {_id: params}
    }
    
    Book.find(filter).populate('autor category editorial').exec((err,book)=>{
        if(err){
            res.status(500).send({ok:false, error:err})
        }else{
            if(!book){
                res.status(404).send({ok:true, book})
            }else{
                res.status(200)
                    .send({
                        ok:true,
                        book
                    })
            }
        }
    })
}

let getBookByAutor = (req,res) => {
    let id = req.params.autor
    let filter

    if(id){
        filter = { autor: id }
    }else{
        return  res.status(400).send({ok:false, error: 'No ha enviado un ID valido'})
    }

    Book.find(filter).populate('autor category editorial').exec((err,book)=>{
        if(err){
            return res.status(500).send({ok:false, error:err})
        }else{
            if(!book){
                return res.status(404).send({ok:true, book})
            }else{
                return res.status(200)
                    .send({
                        ok:true,
                        book
                    })
            }
        }
    })
}

let saveBook = (req,res) => {
    var book = new Book();
    let params = req.body;

    book.title = params.title;
    book.category = params.category;
    book.autor = params.autor;
    book.tags = params.tags;
    book.monthPublished = params.monthPublished;
    book.yearPublished = params.yearPublished;
    book.editorial = params.editorial;
    book.pages = params.pages;
    book.isbn13 = params.isbn13;
    book.briefDescription = params.briefDescription;
    book.sinopsis = params.sinopsis;
    book.linkAmazon = params.linkAmazon;
    book.linkCasadeLibro = params.linkCasadeLibro;
    book.fragment = params.fragment;
    book.comments = params.comments;
    book.imageFront = params.imageFront;
    book.imageBack = params.imageBack;

    

    if(!book.title || !book.category || !book.editorial || !book.isbn13 || !book.autor){
        res.status(404).send({message: 'Uno de los campos requerido del libro no fueron cargados. Por favor verifique el formulario enviado'})
    }else{
        Book.findOne({isbn13: book.isbn13},(err,findit)=>{
            if(err){
                res.status(404).send({message: 'Incidente al cargar un registro'});
            }else{
                if(!findit){
                    book.save({book},(err, savedBook)=>{
                        if(err){
                            console.log(err)
                            res.status(404).send({message: 'Error al dar de alta el registro'});
                        }else{
                            if(!savedBook){
                                res.status(404).send({message: 'El registro no se guardo correctamente'});
                            }else{
                                res.status(200).send({newBook: savedBook});
                            }
                        }
                    })
                }else{
                    res.status(404).send({message: 'El libro ingresado ya existe'});
                }
            }
        })
    }
}

let updateBook = (req,res) => {
    var idBook = req.params.id;
    var values = req.body;

    if(!idBook){
        res.status(404).send({message: "No ha enviado el id del autor que desea actualizar"});
    }else{
        if( !values.title || !values.category || !values.editorial || !values.isbn13 || !values.autor){
            res.status(404).send({message: 'Uno de los campos requerido del libro no fueron cargados. Por favor verifique el formulario enviado'})
        }else{
            Autor.findById(values.autor,(err,finditAut)=>{
                if(err){
                    res.status(404).send({message: 'Incidente al modificar el registro'});
                }else{
                    if(finditAut){
                        Category.findById(values.category,(err,findit)=>{
                            if(err){
                                res.status(404).send({message: 'Incidente al modificar el registro'});
                            }else{
                                if(findit){
                                    Book.findByIdAndUpdate(idBook,values,(err,bookUpdated)=>{
                                        if(err){
                                            res.status(404).send({message: 'Error al actualizar el registro'});
                                        }else{
                                            if(!bookUpdated){
                                                res.status(404).send({message: 'Registro no actualizado'});
                                            }else{
                                                res.status(200).send({BookUpdated: bookUpdated});
                                            }
                                        }
                                    });
                                }else{
                                    res.status(404).send({message: 'Registro no actualizado'});
                                }
                            }
                        })
                    }else{
                        res.status(404).send({message: 'Registro no actualizado'});
                    }
                }
            })
        }
    }
}

module.exports = {
    saveBook,
    getBook,
    updateBook,
    getBookByAutor
}