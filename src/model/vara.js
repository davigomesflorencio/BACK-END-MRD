const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const varaSchema = new Schema(
    {
        numero: Number,
        idTribunal: Number
    }
);
module.exports = mongoose.model("Vara", varaSchema);