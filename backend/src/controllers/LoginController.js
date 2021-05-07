const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');
const Agent = require('../models/BookingAgent');
const AirlineStaff = require('../models/AirlineStaff');

const jwt = require('jsonwebtoken');


module.exports = {
    async customerLogin(req, res){
        try {
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(200).json({message: "Required field missing!"});
            }
            const customer = await Customer.findOne({customer_email: email});
            if(!customer){
                return res.status(200).json({message: "email not found! Do you want to login instead?"})
            }
            
            if (customer && await bcrypt.compare(password, customer.customer_password)){
                const customerResponse = {
                    _id: customer._id,
                    email: customer.customer_email,
                    building_number: customer.building_number,
                    street: customer.street,
                    city: customer.city,
                    state: customer.state,
                    customer_phone_number : customer.customer_phone_number,
                    passport_number : customer.passport_number,
                    passport_expiration: customer.passport_expiration,
                    passport_country : customer.passport_country,
                    date_of_birth: customer.date_of_birth
                }
                return jwt.sign({customer: customerResponse}, 'secret', (err, token)=>{
                    return res.json({
                        customer: token,
                        customer_id: customerResponse._id,
                        customer_email: customerResponse.customer_email
                    })
                })
                // return res.json(customerResponse);
            } else {
                return res.status(400).json({
                    message:`Customer not found! Do you want to register instead?`
                });
            }
        } catch (error) {
            throw Error(`Error while Authenticating user ${error}`);
        }
    }, async agentLogin(req, res){
        try {
            const {email, password} = req.body;
            if(!email|| !password){
                return res.status(200).json({message: "Required Field Missing!"});
            }
            const bookingAgent = await Agent.findOne({agent_email: email});
            if(!bookingAgent){
                return res.status(200).json({message: "email not found!"})
            }
            if (bookingAgent && await bcrypt.compare(password, bookingAgent.agent_password)){
                const bookingAgentResponse = {
                    _id: bookingAgent._id,
                    email: bookingAgent.agent_email
                }
                return jwt.sign({bookingAgent: bookingAgentResponse}, 'secret', (err, token)=>{
                    return res.json({
                        bookingAgent: token,
                        agent_id: bookingAgentResponse._id,
                        agent_email: bookingAgentResponse.email
                    })
                })
            } else {
                return res.status(400).json({
                    message:`Agent not found! Do you want to register instead?`
                });
            }
        } catch (error) {
            throw Error(`Error while Authenticating user ${error}`);
        }
    }, async staffLogin(req, res){
        console.log("backend staffLogin");
        try {
            const {staff_username, staff_password} = req.body;
            if(!staff_username|| !staff_password){
                return res.status(200).json({message: "Required Field Missing!"});
            }
            const staff = await AirlineStaff.findOne({staff_username});
            if(!staff){
                return res.status(200).json({message: "username not found!"});
            }
            if(staff && await bcrypt.compare(staff_password, staff.staff_password)){
                const airlineStaffResponse = {
                    _id: staff._id,
                    staff_username: staff.staff_username,
                    airline_name: staff.airline_name
                }
                return jwt.sign({airlineStaff: airlineStaffResponse}, 'secret', (err, token)=>{
                    return res.json({
                        airlineStaff: token,
                        staff_object_id: airlineStaffResponse._id,
                        airline_name : airlineStaffResponse.airline_name
                    })
                })
            } else {
                return res.status(400).json({
                    message: `staff not found! register instead?`
                });
            }
        } catch (error) {
            throw Error(`Error while Authenticating user ${error}`);
        }
    }
}