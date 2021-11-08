/*
    Medicos
    ruta: /api/medicos
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
} = require('../controllers/medicos');

const router = Router();

router.get( '/', getMedicos);

router.post( '/', 
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedicos);

router.put( '/:id',
    [
    ],
    actualizarMedicos);

router.delete('/:id',
    borrarMedicos);    

module.exports = router;