const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.acceso = (request, response) => {
    response.render('acceso');
}

exports.registro = (request, response) => {
    response.render('registro');
}

exports.conoceme = (request, response) => {
    response.locals.usuario = request.body.nombre;
    response.render('conoceme');
}

exports.intereses = (request, response) => {
    response.locals.usuario = "Alfredo"
    response.render('intereses');
}

exports.futuro = (request, response) => {
    response.locals.usuario = "Alfredo"
    response.render('futuro');
}

exports.login = async (req, res) =>{

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) =>{

        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }

        if(!bcrypt.compareSync(body.contrasena, usuarioDB.contrasena)){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
}

exports.getUsuario = async (req, res) => {
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
}

exports.postUsuario = async (req, res) => {
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
}

