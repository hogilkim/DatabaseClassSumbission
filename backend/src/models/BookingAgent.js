const mongoose = require('mongoose');

const BookingAgentSchema = new mongoose.Schema({
    agent_email: String,
    agent_password: String
});

module.exports = mongoose.model('BookingAgent', BookingAgentSchema);