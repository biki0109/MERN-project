const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    duration: {type: Number, required: true},
    price: {type: Number, required: true},
    created_at: {type: Date, required: true},
}, {timestamp: true,})

const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;