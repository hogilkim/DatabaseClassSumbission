const mongoose = require('mongoose');

const AirplaneSchema = new mongoose.Schema({
    airplane_id: String,
    airline_name: {
        type: String,
        ref:"Airline"
    },
    seats: Number
});

module.exports = mongoose.model('Airplane', AirplaneSchema);