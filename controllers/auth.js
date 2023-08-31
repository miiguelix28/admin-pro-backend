const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario  = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt');
const { googleverify } = require("../helpers/google-verify");
const { getMenuFrontend } = require("../helpers/menu-frontend");


const login = async(req, res = response) => {

    const {email, password} = req.body

    try {
        const usuarioDB = await Usuario.findOne({email});

        // Verificar email
        if (!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar TOKEN -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token, 
            menu: getMenuFrontend(usuarioDB.role)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleverify( googleToken );

        const usuarioDB = await Usuario.findOne( {email} );
        let usuario;
        if ( !usuarioDB ){
            //Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }

        //Guardar en BD
        await usuario.save();

        //Generar TOKEN -JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(usuario.role)
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar TOKEN -JWT
    const token = await generarJWT(uid);

    //Obtener Usuario
    const usuario = await Usuario.findById(uid); 

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend(usuario.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
};