const BookingAgent = require('../models/BookingAgent');
const bcrypt = require('bcrypt');

module.exports = {
    async createBookingAgent(req, res){
        try {
            console.log(req.body);
            const {agent_email, agent_password} = req.body;
            const existentAgent = await BookingAgent.findOne({agent_email});
    
            if(!existentAgent){
                const hashedPassword = await bcrypt.hash(agent_password, 10);
                const bookingAgent = await BookingAgent.create({
                    agent_email,
                    agent_password : hashedPassword
                });
                return res.json(bookingAgent);
            } 
            return res.status(400).json({
                message:`agent already exists! do you want to login instead?`
            });
        } catch (error){
            throw Error(`Error while registering a new agent: ${error}`);
        }
    }
}