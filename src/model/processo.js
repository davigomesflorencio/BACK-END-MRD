const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processoSchema = new Schema(
    {
        idparteContraria: Number, //id da coleção clientes
        idcliente: String, //id da coleção clientes
        idaudiencia: String,//id da coleção clientes
        descricao: String,
        idadvogado: String, //id da coleção advogados
        juiz: String,
        sentenca: String,
        adicional: String
    }
);
module.exports = mongoose.model("Processo", processoSchema);