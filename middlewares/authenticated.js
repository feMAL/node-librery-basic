'use strict'

var jwt =  require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta'

exports.ensureAuth = (req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({message:'La petición no se encuentra autenticada'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload =jwt.decode(token,secret)
        if(payload.exp <= moment.unix() )
        {
            return res.status(401).send({message:'Token a expirado'})    
        }
    }catch(ex){
        
        return res.status(403).send({message:'Token no valido'})
    }
    req.user;
    next()
}