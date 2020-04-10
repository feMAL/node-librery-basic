'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwtoken = require ('../services/jwt')


function saveUser(req, res){
	var user = new User;	
	var params = req.body;

 	user.username = params.username;
 	user.email = params.email.toLowerCase();
 	user.role = 'ROLE_USER';
 	user.image = 'null';

 	if (params.password) {
 		//Encriptar contraseña
 		bcrypt.hash(params.password, null, null, function(err, hash) {
			user.password = hash;
		});	
		//validamos si tenemos todos los datos requeridos.
		if(user.username != null && user.email != null ){
			//Validamos si se encuentra utilizado el email a registrar
			User.findOne({email: user.email}, (err, result)=>{
				if(err){
					res.status(500).send({message: 'Ha ocurrido un error'});
				}else{
					if (!result)
					{
						//registrar  el usuario
						user.save((err, userStored) => {
							if(err){
								res.status(500).send({message: 'Ha ocurrido un error'});
							}else{
								if(!userStored){
										res.status(200).send({message: 'No se pudo registrar el usuario'});
								}else{
										res.status(200).send({users: userStored});
								}
							}
						});	
					}else{
						res.status(200).send({message: 'El email ya se encuentra usado'});
					}
				}
			});
		}else{
			res.status(200).send({message: 'Introduce todos los campos'});
		}
 	}else {
 		res.status(200).send({message: 'Introduce una contraseña'});
 	}
}

function loginUser(req,res){
	var params = req.body;

	var email = params.email;
	var password = params.password;
	console.log(params)
	//Buscamos el usuario a loguear
	User.findOne({email: email}, (err,user) => {
		if (err)
		{
			res.status(500).send({message: 'Error al buscar usuario'})
		}else{
			if(!user){
				res.status(200).send({message: 'el usuario no existe'})
			}else{
				//COMPARAMOS LAS CONTRASEÑAS ENVIADAS.
				bcrypt.compare(password, user.password, (err,check)=>{
					if(check){
						if(params.gethash)
						{						
							// Devolver  TOKEN JWT
							res.status(200).send({token: jwtoken.createToken(user),user: user}
								)
						}else{
							res.status(200).send({user: user})
						}	
					}else{
						res.status(200).send({message: 'el usuario no existe'})
					}
				})
			}
		}
	})
}

var updateUser = (req ,res ) => {
	var userId = req.params.id;
	var update = req.body

	User.findByIdAndUpdate(userId, update, (err,userUpdated)=>{
		if(err){
			res.status(500).send({ message: "no se pudo actualizar el usuario" })
		}else{
			if(!userUpdated){
				res.status(404).send({ message: "No se ha podido actualizar el usuario"});
			}else{
				res.status(200).send({user:userUpdated});
			}
		}
	})
}

var uploadImage = (req,res) =>{
	var userId = req.params.id;
	var filename = "No subido";

	if(req.files){
		console.log(req.files)
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var filename = file_split[2]

		var ext_split = filename.split('\.');
		var ext_file = ext_split[1]

		if(ext_file =='png' || ext_file =='gif' || ext_file =='jpg' ){
			User.findByIdAndUpdate(userId, {image: filename}, (err,userUpdated)=>{
				if(err){
					res.status(500).send({ message: "no se pudo actualizar el usuario" })
				}else{
					if(!userUpdated){
						res.status(404).send({ message: "No se ha podido actualizar el usuario"});
					}else{
						res.status(200).send({image:filename,user:userUpdated});
					}
				}
			});
		}else{
			res.status(200).send({message: 'Extension de archivo no valido'})	
		}
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen'})
	}
}

var getImageFile = (req, res) => {
	var imageFile = req.params.imageFile
	var path_file = './upload/users/'+imageFile
	fs.exists(path_file,(exists)=>{
		if(exists){
			res.sendFile(path.resolve(path_file))
		}else{
			res.status(200).send({message: 'No Existe la imagen'})
		}
	});
}

module.exports = {
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};