const mongoose = require('mongoose');

const StaffPhoneSchema = new mongoose.Schema({
    phone_number: String
});

const AirlineStaffSchema = new mongoose.Schema({
    staff_username: String,
    staff_password: String,
    first_name: String,
    last_name: String,
    date_of_birth: Date,
    airline_name: {
        type: String,
        ref: "Airline"
    },
    staff_phone:[StaffPhoneSchema]
});

module.exports = mongoose.model('AirlineStaff', AirlineStaffSchema);