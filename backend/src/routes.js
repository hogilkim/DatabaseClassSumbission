const express = require("express");
const routes = express.Router();
const CustomerController = require('./controllers/CustomerController');
const AirlineStaffController = require('./controllers/AirlineStaffController');
const WebServiceController = require('./controllers/WebServiceController');
const BookingAgentController = require('./controllers/AgentController');
const LoginController = require('./controllers/LoginController');

const verifyCustomerToken = require('./config/verifyCustomerToken');
const verifyAgentToken = require('./config/verifyAgentToken'); 
const verifyStaffToken = require('./config/verifyStaffToken');

routes.get('/status', (req, res)=>{
    res.send({stats: 200});
})

//LoginController
routes.post('/user/customer/login', LoginController.customerLogin); //done
routes.post('/user/agent/login', LoginController.agentLogin) //done
routes.post('/user/staff/login', LoginController.staffLogin) //done


//CustomerController
routes.post('/user/customer/register', CustomerController.createCustomer); //done
routes.get('/mytickets', verifyCustomerToken, CustomerController.getCustomerTicketById); //done

//AirlineStaffController
routes.post('/staff/createAirport', AirlineStaffController.createAirport); //done
routes.post('/staff/createAirline', AirlineStaffController.createAirline);  
routes.post('/staff/createAirplane', AirlineStaffController.createAirplane);    //done
routes.post('/staff/createFlight', AirlineStaffController.createFlight);    //done
routes.post('/staff/register', AirlineStaffController.createStaff); //done
routes.delete('/flight/:flightID', AirlineStaffController.deleteFlight);
routes.post('/staff/changeFlightStatus', AirlineStaffController.AirlineStaffChangeFlightStatus); //done
routes.get('/staff/viewBookingAgents', AirlineStaffController.AirlineStaffViewBookingAgents);
routes.get('/staff/viewFlights', verifyStaffToken, AirlineStaffController.viewFlights); //done
routes.get('/staff/viewRatings', AirlineStaffController.viewRatings); //! Working on this

routes.get('/staff/seeAirplanes', verifyStaffToken, AirlineStaffController.AirlineStaffSeeAirplanes); //done

//WebServiceController
routes.post('/agent/register', BookingAgentController.createBookingAgent);    //done
routes.post('/ticket/new', WebServiceController.createTicket);//done
routes.post('/transaction/new', WebServiceController.createTransaction);
routes.post('/rating/new', WebServiceController.createRate);  //done
routes.post('/transaction/agent/new', WebServiceController.createTransactionByAgent);//done
routes.get('/agent/viewTransaction', verifyAgentToken, WebServiceController.agentViewTransaction) // done

//No Login
routes.get('/search/searchFlight',WebServiceController.searchFlight) //done


module.exports = routes;
