const { Router } = require('express');
const { login } = require('../controllers/login');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');
const router = Router();

router.post('/', [
    check('password', 'El argumento password es obligatorio').not().isEmpty(),
    check('email', 'El argumento email es obligatorio').not().isEmpty(),
    validarCampos,
], login);

module.exports = router;
