const express = require('express')
const router = express.Router()
const tipoEstudio = require('../controllers/tipoEstudioController')

// ruta get para consutar todos los tipos de estudio
router.get('/', tipoEstudio.consultarTiposEstudio);

// ruta get para consutar los detalles y parametros de un tipo de estudio
router.get('/id', tipoEstudio.consultarTipoEstudio);

module.exports = router;