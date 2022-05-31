const express = require('express')
let CONSTANTS = require('../constantsProject');
const router = express.Router()
const pacienteController = require('../controllers/pacienteController')
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')

// Ruta de tipo 'GET' para obtener todos los pacientes.
router.get('/todos', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    pacienteController.consultarPacientes);

// Ruta de tipo 'GET' para consultar la información del paciente por curp.
router.get('/detalle/curp', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    pacienteController.consutarDetallePaciente);
// Ruta de tipo 'GET' para buscar un paciente por nombre.
router.get('/nombre', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    pacienteController.consultarPorNombre);


// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/registrar', 
    authRol([CONSTANTS.ROLTRABAJOSOCIAL]),
    pacienteController.crearPaciente)

module.exports = router