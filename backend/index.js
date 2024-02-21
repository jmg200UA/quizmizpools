const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { dbConnection } = require('./database/configdb');

const app = express();

dbConnection();

app.use(cors()); 
app.use(express.json());

app.use('/usuarios', require('./routes/usuarios'));
app.use('/ligas', require('./routes/ligas'));
app.use('/login', require('./routes/login'));


app.listen(process.env.PORT, () => {
    console.log("Servidor escuchando en " + process.env.PORT);
});
