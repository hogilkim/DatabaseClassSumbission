const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customer_name: String,
    customer_email: String,
    customer_password: String,
    building_number: String,
    street: String,
    city: String,
    state: String,
    customer_phone_number: String,
    passport_number: String,
    passport_expiration: Date,
    passport_country: String,
    date_of_birth: Date
});

module.exports = mongoose.model('Customer', CustomerSchema);