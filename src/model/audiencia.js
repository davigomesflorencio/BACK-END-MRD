const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audienciaSchema = new Schema(
    {
        data: Date,
        recomendacao: String,
    }
);
module.exports = mongoose.model("Audiencia", audienciaSchema);