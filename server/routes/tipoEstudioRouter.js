const express = require('express')
const router = express.Router()
const tipoEstudio = require('../controllers/tipoEstudioController')

router.get('/:id', tipoEstudio.consultarTipoEstudio)
router.post('/editar/:id', tipoEstudio.editarTipoEstudio)
router.post('/eliminar/:id', tipoEstudio.eliminarTipoEstudio)

module.exports = router