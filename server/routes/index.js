const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

module.exports = function(){

    router.get('/',appController.acceso);

    router.get('/registro',appController.registro);

    router.get('/conoceme',appController.conoceme);
    
    router.get('/intereses',appController.intereses);
    
    router.get('/futuro',appController.futuro);

    router.post('/usuario', appController.postUsuario);

    router.get('/usuario', appController.getUsuario);

    router.post('/login', appController.login);

    return router;
}