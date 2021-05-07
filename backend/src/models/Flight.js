const mongoose = require('mongoose');


const FlightSchema = new mongoose.Schema({
    flight_number: String,
    airline_name: {
        type: String,
        ref: "Airline"
    },
    depart_airport: {
        type: String,
        ref: "Airport"
    },
    depart_time: String,
    depart_date: Date,
    arrival_airport: {
        type: String,
        ref: "Airport"
    },
    arrival_time: String,
    arrival_date: Date,
    base_price: Number,
    airplane_id: {
        type: String,
        ref: "Airplane"
    },
    status: String,
});

module.exports = mongoose.model('Flight', FlightSchema);
