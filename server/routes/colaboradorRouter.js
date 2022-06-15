const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const colaboradorController = require('../controllers/colaboradorController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')



// Ruta de tipo 'GET' para registrar un colaborador por rol.
router.get('/',
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.getRegistrarColaborador);

// Ruta de tipo 'POST' para registrar un colaborador por rol.
router.post('/registrar', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.registrarColaborador);

// Ruta de tipo 'GET' para obtener todos los colaboradores.
router.get('/todosColaboradores', 
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consultarColaborador);

// Ruta de tipo 'GET' para consultar la información del colaborador por username.
router.get('/detalle/username',
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.consutarDetalleColaborador);

// Ruta de tipo 'POST' para eliminar la información del colaborador.
router.post('/detalle/username/borrar',
    authRol([CONSTANTS.ROLADMIN]),
    colaboradorController.borrarColaborador);

module.exports = router;
