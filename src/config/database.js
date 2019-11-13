const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        autoIndex: false 
    })
    .then(() => console.log('Conexão estabelecida com o banco de dados'))
    .catch(err => {
        console.log("Erro de conexão ao banco de dados: " + err.message);
    });

module.exports = mongoose;