const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advogadoSchema = new Schema(
    {
        nome: String,
        endereco: { rua: String, num: Number, bairro: String, cidade: String },
        email: String,
        usuario: String,
        senha: String,
        oab: String,
        cpf: String,
    }
);
module.exports = mongoose.model("Advogado", advogadoSchema);