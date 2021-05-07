const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transaction_ID: String,
    customer_email:{
        type:String,
        ref:"Customer"
    },
    agent_email: {
        type: String,
        ref: "BookingAgent"
    },
    ticket_ID:String,
    commision_pirce: Number
});

module.exports = mongoose.model('Transaction', TransactionSchema);