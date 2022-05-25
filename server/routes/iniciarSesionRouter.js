//Iniciar Sesión: IT3-3 (https://docs.google.com/spreadsheets/d/15joWXNI4EA9Yy9C-vT1BVZVrxoVJNX1qjkBx73TFo5E/edit?usp=sharing)

let CONSTANTS = require('../constantsProject');
const express = require('express');
const router = express.Router();
const { authUsuario, noAuthUsuario, authRol } = require('../rbac/Authentication');

const colaboradorController = require('../controllers/colaboradorController');

router.post('/', 
    noAuthUsuario,
    colaboradorController.iniciarSesionColaborador);

module.exports = router;