const express = require('express')
const router = express.Router()
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')
let CONSTANTS = require('../constantsProject');
const pacienteController = require('../controllers/pacienteController')

// Ruta de tipo 'GET' para obtener todos los pacientes.
router.get('/', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    pacienteController.consultarPacientes);
// Ruta de tipo 'POST' para registrar un nuevo paciente.
router.post('/', 
    //authRol([CONSTANTS.ROLTRABAJOSOCIAL]),
    pacienteController.crearPaciente)
// Ruta de tipo 'GET' para obtener los estudios de un paciente.
router.get('/estudios',
    //authRol([CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLQUIMICO]),
    pacienteController.mostrarEstudiosPaciente)
// Ruta de tipo 'GET' para buscar un paciente por nombre.
router.get('/:nombre', 
// authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
pacienteController.consultarPorNombre);
// Ruta de tipo 'GET' para consultar la información del paciente por curp.
router.get('/detalle/:curp', 
    // authRol([CONSTANTS.ROLTRABAJOSOCIAL, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLDOCTOR, CONSTANTS.ROLNUTRIOLOGO, CONSTANTS.ROLPSICOLOGO]),
    pacienteController.consutarDetallePaciente);


module.exports = router