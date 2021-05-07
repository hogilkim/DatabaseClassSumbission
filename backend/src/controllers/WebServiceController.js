const Customer = require('../models/Customer');
const Flight = require('../models/Flight');
const BookingAgent = require('../models/BookingAgent');
const Transaction = require('../models/Transaction');
const Ticket = require('../models/Ticket');
const Rate = require('../models/Rate');
const jwt = require('jsonwebtoken');
module.exports ={
    async createTicket (req, res){
        try {
            const {ticket_ID, customer_email, flight_number, airline_name, sold_price, card_type, card_num, 
                name_on_card, expiration_date } = req.body;
                
                console.log("backend create Ticket", req.body);

            const existentFlight = await Flight.findOne({flight_number});
            var current = new Date();
            if(existentFlight){
                const newTicket = await Ticket.create({
                    ticket_ID,
                    customer_email,
                    airline_name, 
                    flight_number,
                    sold_price : parseFloat(sold_price),
                    card_type,
                    card_num,
                    name_on_card,
                    expiration_date,
                    purchase_date : current.getHours(),
                    purchase_time : current.getMinutes()
                });

                return res.json(newTicket);
            }
            return res.status(400).json({
                message: `There is no such flight`
            });
        } catch (error) {
            throw Error(`Error while creating a new ticket: ${error}`);
        }
    },
    async createTransaction (req, res){
        try{
            console.log("backend create transaction", req.body);
            const {ticket_ID, customer_email, commission_price, transaction_ID} = req.body;
            const {agent_email} = req.headers;
            const existentCustomer = await Customer.findOne({customer_email});
            if (existentCustomer){
                const newTransaction = await Transaction.create({
                    customer_email,
                    agent_email,
                    ticket_ID,
                    commission_price : parseFloat(commission_price),
                    transaction_ID
                });
                return res.json(newTransaction);
            } 
            return res.status(400).json({
                message: `Please check customer email and ticket`
            })
        } catch (error){
            throw Error(`Error while creating a new transaction: ${error}`);
        }
    },
     
    async createRate(req, res){
        try{
            const { rate, comment, ticket_ID } = req.body;
            // const { ticket_ID } = req.headers;
            console.log(ticket_ID);
            const existentTicket = await Ticket.findOne({ticket_ID});
            
            if(existentTicket){
                const customer_email = existentTicket.customer_email;
                const flight_number = existentTicket.flight_number;
                console.log(customer_email);
                console.log(flight_number);
                const newRate = await Rate.create({
                    customer_email,
                    flight_number,
                    ticket_ID,
                    rate,
                    comment
                });
                
                return res.json(newRate);
            }
            return res.status(400).json({
                message: `no such ticket`
            });

        } catch (error) {
            throw Error(`Error while creating new Rating ${error}`);
        }
    },
    
    async searchFlight(req, res){
        try {
            const {depart_date, depart_airport, arrival_airport} = req.headers;
            console.log(depart_date, depart_airport, arrival_airport);
            const flights = await Flight.find({depart_date, depart_airport, arrival_airport});
            console.log(flights);
            if(flights){
                return res.json(flights);
            }
        } catch (error) {
            return res.status(400).json({ message: `We do have any events yet` });
        }
    }, async createTransactionByAgent (req, res){
        try{
            const {ticket_ID, customer_email, agent_email, commission_price, transaction_ID} = req.body;
            console.log("createTransactionByAgent",agent_email);
            const existentCustomer = await Customer.findOne({customer_email});
            if (existentCustomer){
                const newTransaction = await Transaction.create({
                    customer_email,
                    agent_email,
                    ticket_ID,
                    commission_price : parseFloat(commission_price),
                    transaction_ID
                });
                return res.json(newTransaction);
            } 
            return res.status(400).json({
                message: `Please check customer email and ticket`
            })
        } catch (error){
            throw Error(`Error while creating a new transaction: ${error}`);
        }
    }, agentViewTransaction(req, res){
        jwt.verify(req.token,'secret', async (err, authData)=>{
            if(err){
                res.sendStatus(401);
            } else {
                try {
                    console.log("agentViewTransaction", authData.bookingAgent.email);
                    const transactions = await Transaction.find({agent_email: authData.bookingAgent.email});

                    if(transactions){
                        return res.json({authData, transactions});
                    } else {
                        return res.status(400).json({message: `No Transactions`});
                    }
                } catch (error) {
                    throw Error (`Error while finding transactions`)
                }
            }
        })
    }
}