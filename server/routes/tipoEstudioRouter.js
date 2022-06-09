const express = require('express');
let CONSTANTS = require('../constantsProject');
const router = express.Router();
const tipoEstudio = require('../controllers/tipoEstudioController');
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')


// ruta get para consutar todos los tipos de estudio
router.get('/',authRol([CONSTANTS.ROLADMIN, CONSTANTS.ROLQUIMICO]), tipoEstudio.consultarTiposEstudio);

// Ruta de tipo 'POST' para eliminar tipo de estudio
router.post('/id/borrar', 
    authRol([CONSTANTS.ROLQUIMICO]),
    tipoEstudio.eliminarTipoEstudio);

// ruta get para consutar los detalles y parametros de un tipo de estudio
router.get('/id', authRol([CONSTANTS.ROLADMIN, CONSTANTS.ROLQUIMICO]), tipoEstudio.consultarTipoEstudio);

// ruta post para registrar un nuevo tipo de estudio
router.post('/registrar', authRol([CONSTANTS.ROLQUIMICO]), tipoEstudio.registrarTipoEstudio);

module.exports = router;