const { Router } = require('express');
const { obtenerLigas, crearLiga, actualizarLiga, sumarIntegrante, restarIntegrante, actualizarPuntos, borrarLiga} = require('../controllers/ligas');
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

router.put('/sum/:id/:usuario',[ //COMO LO HACEMOS
    check('id','el id no es valido').isMongoId(),
    check('usuario','el id-usu no es valido').isMongoId(),
    validarCampos
], sumarIntegrante);

router.put('/res/:id/:usuario',[
    check('id','el id no es valido').isMongoId(),
    check('usuario','el id-usu no es valido').isMongoId(),
    validarCampos
], restarIntegrante);

router.put('/pts/:id/:usuario',[
    check('id','el id no es valido').isMongoId(),
    check('usuario','el id-usu no es valido').isMongoId(),
    check('jornada','jornada debe ser un número').isNumeric(),
    check('puntos','puntos debe ser un número').isNumeric(),
    validarCampos
], actualizarPuntos);

router.delete('/:id',[
    check('id','el id no es valido').isMongoId(),
    validarCampos
], borrarLiga);

module.exports = router;