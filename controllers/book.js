'use strict'

let Book = require('../models/book');
let Autor = require('../models/autor');
let Category = require('../models/category');
var pagination = require('mongoose-pagination');


let getBookById = (req,res) => {
    let bookId = req.params.id;

    Book.findById(bookId,(err,findit)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registro'});
            throw err
        }else{
            if(!findit){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({book : findit})
            }
        }
    });
}

let getBookByTitle = (req,res) => {
    let bookTitle = req.params.title;

    Book.findOne({title: bookTitle},(err,findit)=>{
        if(err){
            res.status(404).send({message: 'Error al buscar el registro'});
            throw err
        }else{
            if(!findit){
                res.status(404).send({message: 'El registro no ha sido encontrado'});
            }else{
                res.status(200).send({book : findit})
            }
        }
    });
}

let getBooks = (req,res) => {
    if(req.params.page){
        var pages = req.params.page;
    }else{
        var pages = 1;
    }
    var itemsPerPage = 5
    Book.find().sort('title').paginate(pages,itemsPerPage,(err,autors,tot)=>{
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
                    autotrs: autors
                });
            }
        }
    });
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
        Book.findOne({isbn13: book.isbn13, editorial: book.editorial},(err,findit)=>{
            if(err){
                res.status(404).send({message: 'Incidente al cargar un registro'});
            }else{
                if(!findit){
                    book.save({book},(err, savedBook)=>{
                        if(err){
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
    getBookById,
    getBookByTitle,
    updateBook
}


            /*if(values.isbn13){
                Book.findOne({isbn13: values.isbn13},(err,findit)=>{
                    if(err){
                        res.status(404).send({message: 'Incidente al modificar el registro'});
                    }else{
                        if(!findit){
                            updatear = true;
                        }else{
                            updatear = false;
                        }
                    }
               })
            }*/