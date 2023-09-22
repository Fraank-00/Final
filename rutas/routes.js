const express = require('express');
const router = express.Router();
const posteoController = require('../controladores/posteoController');

router.get('/', posteoController.getPosteos);
router.get('/publicar', posteoController.renderPublicar);
router.post('/publicar', posteoController.crearPosteo);
router.get('/eliminar/:id', posteoController.eliminarPosteo);
router.get('/editar/:id', posteoController.renderEditar);
router.post('/editar/:id', posteoController.actualizarPosteo);

module.exports = router;
