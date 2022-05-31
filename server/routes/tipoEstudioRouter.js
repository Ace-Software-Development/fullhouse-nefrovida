const express = require('express');
let CONSTANTS = require('../constantsProject');
const router = express.Router();
const tipoEstudio = require('../controllers/tipoEstudioController');
const {authUsuario, noAuthUsuario, authRol} = require('../rbac/Authentication')


// ruta get para consutar todos los tipos de estudio
router.get('/',authRol([CONSTANTS.ROLADMIN, CONSTANTS.ROLQUIMICO, CONSTANTS.ROLTRABAJOSOCIAL]), tipoEstudio.consultarTiposEstudio);

// ruta get para consutar los detalles y parametros de un tipo de estudio
router.get('/id', authRol([CONSTANTS.ROLADMIN, CONSTANTS.ROLQUIMICO]), tipoEstudio.consultarTipoEstudio);

module.exports = router;