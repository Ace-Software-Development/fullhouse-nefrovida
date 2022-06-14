const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const consultaController = require('../controllers/consultaController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

// Ruta de tipo 'POST' para registrar un nuevo resumen de consulta.
router.post('/registrar', 
    authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    consultaController.registrarConsulta)

    // Ruta de tipo 'GET' para obtener el detalle de estudio.
router.get('/detalle/notas',
    authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO,CONSTANTS.ROLADMIN]),
    consultaController.consultarDetalleConsulta);

module.exports = router