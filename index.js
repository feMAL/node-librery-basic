'use strict'

let mongoose = require('mongoose')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dbbookstore',
    { 
        useUnifiedTopology: true,
        useNewUrlParser: true 
    } ,(err,inline)=>{
    if(err){
        throw err
    }else{
        console.log("DB Connected");
        let app = require('./app');
        let port = process.env.port || 5000
        app.listen(port,()=>{
            console.log("SRV Connected in port "+port);
        });
    }
})

module.exports = mongoose;