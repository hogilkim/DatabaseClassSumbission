const mongoose = require('mongoose');

const AirlineSchema = new mongoose.Schema({
    airline_name: String
});

module.exports = mongoose.model('Airline', AirlineSchema);