const {PORT, DATABASE_LOCAL} = require('./config/config')
const routes = require('./routes/index.js');

const express = require('express');
const bodyParse = require('body-parser');
const mongoos = require('mongoose');
const app = express();


//Configuracion de entrada de informacion
app.use(bodyParse.urlencoded({ extended: false }));

app.use(bodyParse.json());

app.use('/',routes());

//Conexion a la base de datos MongoDB
mongoos.connect(DATABASE_LOCAL,{useNewUrlParser: true, useCreateIndex: true})
.then( db => console.log('Base de datos conectada con exito'))
.catch( err => console.log('ERROR: No pudo conectarse a la base de datos, e:'+err))

app.listen(PORT, () =>{
    console.log('Servidor corriendo en puerto', PORT);
})