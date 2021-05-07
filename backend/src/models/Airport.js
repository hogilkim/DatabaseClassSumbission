const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
    airport_name: String,
    city: String
});

module.exports = mongoose.model('Airport', AirportSchema);