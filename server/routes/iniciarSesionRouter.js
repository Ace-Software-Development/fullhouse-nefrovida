let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

const colaboradorController = require("../controllers/colaboradorController");

router.post('/', 
    noAuthUsuario,
    colaboradorController.iniciarSesionColaborador);

module.exports = router;