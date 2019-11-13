const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const custaSchema = new Schema(
    {
        valor: Number,
        comprovantePath: String, //Supondo que apenas o caminho para o pdf é salvo
    }
);
module.exports = mongoose.model("Custa", custaSchema);