const express = require('express');
const ApiRoutes = require("./routes/routes");
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
require('dotenv').config();

const app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var db = mongoose.connection;


app.use('/api', ApiRoutes);

app.listen(port, () => {
    console.log("Servidor Iniciado: Rodando na porta " + port);
});