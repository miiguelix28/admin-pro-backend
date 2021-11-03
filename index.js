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

//Lectura y pasero del body
app.use(express.json());

//Base de datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en puerto'+ process.env.PORT);
});