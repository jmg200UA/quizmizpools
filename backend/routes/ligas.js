const { Router } = require('express');
const { obtenerLigas, crearLiga, actualizarLiga, borrarLiga } = require('../controllers/ligas');
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');

const router = Router();

router.get('/', obtenerLigas);

router.post('/',[
    check('nombre','nombre es obligatorio').not().isEmpty().trim(),
    check('descripcion').optional().trim(),
    validarCampos
], crearLiga);

router.put('/:id',[
    check('id','el id no es valido').isMongoId(),
    check('nombre','nombre es obligatorio').not().isEmpty().trim(),
    check('descripcion').optional().trim(),
    validarCampos
], actualizarLiga);

router.delete('/:id',[
    check('id','el id no es valido').isMongoId(),
    validarCampos
], borrarLiga);

module.exports = router;