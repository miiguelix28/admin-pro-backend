/*
    Path: /api/login
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password','Password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
)



module.exports = router;