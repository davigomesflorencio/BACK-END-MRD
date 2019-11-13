const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema(
    {
        nome: String,
        endereco: { rua: String, numero: Number, bairro: String, cidade: String },
        email: String,
        usuario: String,
        senha: String,
        cpf: String,
        cnpj: String,
    }
);
module.exports = mongoose.model("Cliente", clienteSchema);