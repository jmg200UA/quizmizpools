const { Router } = require('express');
const { obtenerUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const {check} = require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');

const router = Router();

router.get('/', obtenerUsuarios);

router.post('/',[
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('email','email es obligatorio').not().isEmpty(),
    check('password','password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.put('/:id',[
    check('nombre','nombre es obligatorio').not().isEmpty(),
    check('email','email es obligatorio').not().isEmpty(),
    check('id','el id no es valido').isMongoId(),
    validarCampos
], actualizarUsuario);

router.delete('/:id',[
    check('id','el id no es valido').isMongoId(),
    validarCampos
], borrarUsuario);

module.exports = router;