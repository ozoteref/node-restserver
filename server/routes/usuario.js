const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');


const app = express();
app.get('/usuario', function(req, res){

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({}, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec( (err, usuarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });

        });
});

app.post('/usuario', function(req, res){
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        contrasena: bcrypt.hashSync(body.contrasena, 10)
    });

    usuario.save( (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.contrasena = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.put('/usuario/:id', function(req, res){
    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/usuario', function(req, res){
    res.json('delete usuario');
});

module.exports = app;