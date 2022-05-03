let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const {authUsuario, authRol} = require('../rbac/Authentication')

const colaboradorController = require("../controllers/colaboradorController");

router.get('/registrar', 
    // authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.getRegistrarColaborador);

router.post('/registrar', 
    // authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.registrarColaborador);

module.exports = router;
