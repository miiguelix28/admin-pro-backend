const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}


const validaADMIN_ROLE = async(req, resp, next) => {

    const uid = req.uid

try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
        return resp.status(404).json({
            ok: false,
            msg: 'Usuario no existe'
        })
    }

    if (usuarioDB.role !== 'ADMIN_ROLE') {
        return resp.status(403).json({
            ok: false,
            msg: 'No tienes permisos para hacer esto'
        })
    }

    next();

} catch (error) {
    resp.status(500).json({
        pk: false,
        msg: 'Habla con el administrador'
    })
}
}

const varlidarADMIN_ROLE_o_MismoUsuario = async(req, res, next)  => {

    const uid = req.uid;
    const id  = req.params.id;
    
    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if ( usuarioDB.role === 'ADMIN_ROLE' || uid === id ) {
        
            next();
            
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            });
        }

        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    validarJWT,
    validaADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario,
}