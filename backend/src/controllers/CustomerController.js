const Customer = require('../models/Customer');
const Ticket = require('../models/Ticket')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async createCustomer(req, res){
        try {
                console.log(req.body);
                const {customer_name, customer_email, customer_password, building_number,
                    street, city, state, customer_phone_number, passport_number, passport_expiration,
                    passport_country, date_of_birth} = req.body;

                const existentCustomer = await Customer.findOne({customer_email});

                if(!existentCustomer){
                    const hashedPassword = await bcrypt.hash(customer_password, 10);
                    const newCustomer = Customer.create({
                        customer_name,
                        customer_email,
                        customer_password: hashedPassword,
                        building_number,
                        street,
                        city,
                        state,
                        customer_phone_number,
                        passport_number,
                        passport_expiration,
                        passport_country,
                        date_of_birth
                    });
                    const response = {
                        customer_email
                    }
                    return res.json(response);
                }
                return res.status(400).json({
                    message: `email/user already exist! do you want to login instead?`
                });
                

        } catch(error){
            throw Error(`Error while registering a new user: ${error}`);
        }
    },
    getCustomerTicketById(req, res){
        jwt.verify(req.token, 'secret', async (err, authData)=>{
            if(err){
                res.sendStatus(401); 
            } else {
                
                try {
                    // const {customer_id} = req.params;
                    console.log("backend", authData.customer);
                    const customerInTickets = await Ticket.find({customer_email: authData.customer.email});
                    var totalSpending = 0;
                    customerInTickets.forEach(function(ticket){
                        totalSpending += parseFloat(ticket.sold_price);
                    });
                    if (customerInTickets) {
                        return res.json({authData, customerInTickets, totalSpending})
                    } else {
                        return res.status(400).json({ message: `Ticket ID does not exist!` });         
                    }
                } catch (error){
                    throw Error(`Error while finding ticket by id`);
                }
            }
        })        
    }
}