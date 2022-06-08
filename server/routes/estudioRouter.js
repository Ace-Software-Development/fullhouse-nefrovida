const express = require('express');
const router = express.Router();
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication');
const estudioController = require('../controllers/estudioController.js');
let CONSTANTS = require('../constantsProject');

// Ruta de tipo 'POST' para registrar la información de un estudio
router.post('/', 
    authRol([CONSTANTS.ROLQUIMICO]),
    estudioController.registrarResultadosEstudio);

// Ruta de tipo 'POST' para eliminar estudio paciente
router.post('/id/borrar', 
    authRol([CONSTANTS.ROLQUIMICO]),
    estudioController.eliminarEstudioPaciente);

// Ruta de tipo 'GET' para obtener el detalle de estudio.
router.get('/id',
    authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLQUIMICO]),
    estudioController.consultarEstudioPaciente);

module.exports = router;