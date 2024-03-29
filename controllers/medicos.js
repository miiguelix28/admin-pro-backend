const { response } = require("express")
const Medico = require('../models/medicos')

const getMedicos = async (req, res = response) => {

    const medico = await Medico.find()
                                    .populate('usuario','nombre img')
                                    .populate('hospital','nombre')

    res.json({
        ok: true,
        medico
    })
}

const getMedicoById = async (req, res = response) => {
    const id = req.params.id;
    try {
        const medico = await Medico.findById(id)
                                        .populate('usuario','nombre img')
                                        .populate('hospital','nombre');
    
        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Medico no encontrado'
        })
    }
}

const crearMedicos = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({ 
        usuario: uid,
        ...req.body 
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarMedicos =  async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById( id );

        if ( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe medico con id'
            });
        }
        
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new:true} );
        
        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarMedicos = async (req, res = response) => {

    const id = req.params.id;

    try {

    const medico = await Medico.findById( id );

    if ( !medico ){
        return res.status(404).json({
            ok: false,
            msg: 'No existe medico con este id'
        });
    }

    await Medico.findByIdAndRemove(id);
    
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicoById,
}