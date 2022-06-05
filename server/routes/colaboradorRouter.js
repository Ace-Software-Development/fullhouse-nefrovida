const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const colaboradorController = require('../controllers/colaboradorController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')


console.log("Pasa por inicio router");
// Ruta de tipo 'GET' para obtener todos los pacientes.
router.get('/todosColaboradores', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consultarColaborador);

// Ruta de tipo 'GET' para consultar la información del paciente por curp.
router.get('/detalle/username', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consutarDetalleColaborador);

module.exports = router