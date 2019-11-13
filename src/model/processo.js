const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processoSchema = new Schema(
    {
        idparteContraria: Number, //id da coleção clientes
        idcliente: Number, //id da coleção clientes
        idaudiencia: Number,//id da coleção clientes
        descricao: String,
        idadvogado: Number, //id da coleção advogados
        juiz: String,
        sentenca: String,
        adicional: String
    }
);
module.exports = mongoose.model("Processo", processoSchema);