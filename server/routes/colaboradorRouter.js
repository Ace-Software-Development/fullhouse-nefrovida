const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const colaboradorController = require('../controllers/colaboradorController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

// Ruta de tipo 'GET' para consultar la información del colaborador por username.
router.get('/detalle', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consutarDetalleColaborador);
    
// Ruta de tipo 'GET' para obtener todos los colaboradores.
router.get('/todosColaboradores', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consultarColaborador);


module.exports = router