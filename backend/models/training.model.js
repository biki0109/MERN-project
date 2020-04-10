const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    id: {type: String, required: true},
    ptID: {type: String},
    clientID: {type: String},
    clientName: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
}, {timestamp: true,})

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;