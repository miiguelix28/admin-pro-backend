require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');
//Usuario : mean_user
//Contraseña : jPMeZTeLHRMt7VBq

//Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

//Base de datos
dbConnection();


//Rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en puerto'+ process.env.PORT);
});