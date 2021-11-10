/*
    Path: /api/login
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/',
    [
        check('email', 'Email es obligatorio').isEmail(),
        check('password','Password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
); 

router.get('/renew',
    validarJWT,
    renewToken
); 


module.exports = router;