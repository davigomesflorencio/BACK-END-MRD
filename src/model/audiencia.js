const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audienciaSchema = new Schema(
    {
        data:{ type: Date, default: Date.now },
        recomendacao: String,
    }
);
module.exports = mongoose.model("Audiencia", audienciaSchema);