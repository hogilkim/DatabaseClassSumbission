const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
   ticket_ID: String,
   customer_email: String,
   airline_name: {
       type: String,
       ref: "Airline"
   },
   flight_number: {
       type: String,
       ref: "Flight"
   },
   sold_price: Number,
   card_type: String,
   card_num : String,
   name_on_card: String,
   expiration_date: Date,
   purchase_date: Date,
   purchase_time: Date
});

module.exports = mongoose.model('Ticket', TicketSchema);