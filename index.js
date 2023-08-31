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

//Directorio Publico
app.use( express.static('public'));


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

// LO último
app.get('*', (res,res) => {
    res.sendFile( path.resolve(_dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () =>{
    console.log('servidor corriendo en puerto'+ process.env.PORT);
});