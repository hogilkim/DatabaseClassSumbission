const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const Airplane = require('../models/Airplane');
const Flight = require('../models/Flight');
const AirlineStaff = require('../models/AirlineStaff');
const BookingAgent = require('../models/BookingAgent');
const Rate = require('../models/Rate');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports ={
    async createStaff(req, res){
        try {
            console.log("line 13", req.body);
            const {staff_username, staff_password, first_name, last_name, date_of_birth, airline_name, staff_phone} = req.body;
            const existentStaff = await AirlineStaff.findOne({staff_username});
            const existentAirline = await Airline.findOne({airline_name});

            if(!existentAirline){
                return res.status(400).json({message: `No Such Airline!`});
            }

            if (!existentStaff) {
                const hashedPassword = await bcrypt.hash(staff_password, 10);
                const airlineStaff = await AirlineStaff.create({
                    staff_username,
                    staff_password : hashedPassword,
                    first_name,
                    last_name,
                    date_of_birth,
                    staff_phone : [{phone_number: staff_phone}],
                    airline_name
                });
                return res.json(airlineStaff);
            }
            return res.status(400).json({
                message:`staff already exists! do you want to login instead?`
            });
        } catch(error){
        throw Error(`Error while registering a new user: ${error}`);
        }
    },

    async createAirport(req, res){
        try {
            const { airport_name, city } = req.body;
    
            const existentAirport = await Airport.findOne({airport_name});
    
            if(!existentAirport){
                const airport = await Airport.create({
                    airport_name,
                    city
                });
                return res.json(airport);
            }
            return res.status(400).json({
                message: `airport already exists`
            });
            
        } catch (error) {
            throw Error(`Error while creating new airport: ${error}`);
        }
    },

    async createAirline(req, res){
        try {
            const { airline_name } = req.body;
            const existentAirline = await Airline.findOne({airline_name});
            if(!existentAirline){
                const airline = Airline.create({
                    airline_name
                });
                return res.json(airline);
            }
            return res.status(400).json({
                message: `airline already exists`
            });
        } catch (error) {
            throw Error(`Error while creating new airline: ${error}`);
        }
    },

    async createAirplane(req, res){
        try {
            const { airplane_id, airline_name, seats } = req.body;

            const existentAirline = await Airline.findOne({airline_name});

            if (!existentAirline){
                return res.status(400).json({ message: `Airline does not exist!`});
            }
            const airplane = await Airplane.create({
                airplane_id,
                airline_name,
                seats
            })
            return res.json(airplane);
        } catch (error) {
            throw Error(`Error while creating new airplane: ${error}`);
        }
    },

    async createFlight(req, res){
        try {
            const { flight_number, airline_name, depart_time, depart_date, arrival_time, 
                arrival_date, base_price, status, depart_airport, arrival_airport, airplane_id} = req.body


                
            const existentAirline = await Airline.findOne({airline_name});
            const existentDepartureAirport = await Airport.findOne({airport_name: depart_airport});
            const existentArrivalAirport = await Airport.findOne({airport_name: arrival_airport});
            const existentPlane = await Airplane.findOne({airplane_id});
            
            if(!existentAirline){
                return res.status(400).json({message: `No Such Airline!`})
            }
            if(!existentDepartureAirport){
                return res.status(400).json({message: `No Such Departure Airport!`})
            }
            if(!existentArrivalAirport){
                return res.status(400).json({message: `No Such Arrival Airport!`})
            }
            if(!existentPlane){
                return res.status(400).json({message: `No Such Plane!`})
            }

            const flight = await Flight.create({
                flight_number, depart_time, depart_date, arrival_time, 
                arrival_date, base_price: parseFloat(base_price), 
                status, airline_name, depart_airport, arrival_airport, airplane_id
            })
            return res.json(flight);


        } catch (error) {
            throw Error(`Error while creating new flight: ${error}`);
        }
    }, 

    async deleteFlight(req, res){
        const {flightID} = req.params;
        try {
            await Flight.findByIdAndDelete(flightID);
            return res.status(204).send()
        } catch (error) {
            throw Error(`Error while deleting flight: ${error}`);
        }
    }, 

    async AirlineStaffChangeFlightStatus (req, res){
        const {flight_number, status} = req.body;
        console.log(flight_number, status);
        try{
            const modified = await Flight.findOneAndUpdate({flight_number:flight_number}, {$set:{status:status}});
            return res.json(modified);
        } catch (error){
            throw Error(`Error while modifying: ${error}`)
        }
    },

    AirlineStaffSeeAirplanes(req,res) {
        jwt.verify(req.token, 'secret', async (err, authData)=>{
            if (err){
                res.sendStatus(401);
            } else {
                try {
                    const airplanes = await Airplane.find({airline_name : authData.airlineStaff.airline_name});
                    if (airplanes){
                        return res.json({authData, airplanes});
                    } else {
                        return res.status(400).json({message:`airline not found in controller`});
                    }
                    
                } catch (error) {
                    throw Error(`Error in AirlineStaffSeeAirplanes in airline staff controller`);
                }
            }

        })
        

    },
    async AirlineStaffViewBookingAgents(req, res){
        try {
            const agents = await BookingAgent.find({});
            return res.json(agents);
        } catch (error) {
            throw Error(`Error while getting all the agents`);
        }
    },

    async viewFlights(req, res){
        jwt.verify(req.token, 'secret', async (err, authData)=>{
            if(err){
                res.sendStatus(401);
            } else {
                try {
                    const flights = await Flight.find({airline_name: authData.airlineStaff.airline_name});
                    if (flights){
                        return res.json({authData, flights});
                    } else {
                        return res.status(400).json({message: `flights not found in controller`});
                    }
                } catch (error) {
                    throw Error(`Error view flights in airline staff controller`)
                }
            }
        })
    },
    async viewRatings(req, res){
        try {
            const {flight_number} = req.headers;
            console.log(flight_number);
            const rates = await Rate.find({flight_number: flight_number});
            if(rates){
                res.json(rates);
            }
        } catch (error) {
            throw Error(`Error finidng rates in airline staff controller`)
        }
    }
}