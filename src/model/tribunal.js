const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tribunalSchema = new Schema(
    {
        endereco: { rua: String, numero: Number, bairro: String, cidade: String }
    }
);
module.exports = mongoose.model("Tribunal", tribunalSchema);