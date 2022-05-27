let CONSTANTS = require("../constantsProject");
const express = require('express');
const router = express.Router();
const {authUsuario, authRol} = require('../rbac/Authentication')

const estudioController = require("../controllers/estudioController");

// Ruta de tipo 'GET' para obtener el detalle de estudio.
router.get('/:idEstudio', estudioController.consultarEstudioPaciente);

module.exports = router;