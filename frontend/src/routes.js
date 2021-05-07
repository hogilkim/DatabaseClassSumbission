import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/CustomerPages/Login';
import MyTickets from './pages/CustomerPages/MyTickets';
import Register from './pages/CustomerPages/Register';
import BuyTicket from'./pages/CustomerPages/BuyTicket';
import Rate from'./pages/CustomerPages/Rate';

import BookingAgentRegister from './pages/BookingAgentPages/BookingAgentRegister'
import BookingAgentLogin from './pages/BookingAgentPages/BookingAgentLogin'
import BookingAgentMenu from './pages/BookingAgentPages/BookingAgentMenu'
import BookingAgentPurchaseTicket from './pages/BookingAgentPages/BookingAgentPurchaseTicket'
import BookingAgentViewTransaction from './pages/BookingAgentPages/BookingAgentViewTransaction'

import AirlineStaffRegister from './pages/AirlineStaffPages/AirlineStaffRegister'
import AirlineStaffLogin from './pages/AirlineStaffPages/AirlineStaffLogin'
import AirlineStaffMenu from './pages/AirlineStaffPages/AirlineStaffMenu'
import AirlineStaffCreateFlight from './pages/AirlineStaffPages/AirlineStaffCreateFlight'
import AirlineStaffChangeStatus from './pages/AirlineStaffPages/AirlineStaffChangeStatus'
import AirlineStaffCreateAirport from './pages/AirlineStaffPages/AirlineStaffCreateAirport'
import AirlineStaffSeeAirplanes from './pages/AirlineStaffPages/AirlineStaffSeeAirplanes'
import AirlineStaffViewBookingAgents from './pages/AirlineStaffPages/AirlineStaffViewBookingAgents'
import AirlineStaffViewFlights from './pages/AirlineStaffPages/AirlineStaffViewFlights'
import AirlineStaffViewRates from './pages/AirlineStaffPages/AirlineStaffViewRates'

import SearchFlight from './pages/NoLoginPages/SearchFlight'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                // Customer Pages
                <Route path='/customer/login' exact component={Login} />
                <Route path = '/customer/mytickets' exact component = {MyTickets} />
                <Route path = '/user/customer/register' exact component = {Register} />
                <Route path = '/customer/buyticket' exact component = {BuyTicket} />
                <Route path = '/rating/new' exact component = {Rate} />

                // Booking Agent Pages
                <Route path = '/agent/register' exact component = {BookingAgentRegister}/>
                <Route path = '/agent/login' exact component = {BookingAgentLogin}/>
                <Route path = '/agent/menu' exact component = {BookingAgentMenu}/>
                <Route path = '/agent/purchaseTicket' exact component = {BookingAgentPurchaseTicket}/>
                <Route path = '/agent/viewTransaction' exact component = {BookingAgentViewTransaction}/>

                // Airline Staff Pages
                <Route path = '/staff/register' exact component = {AirlineStaffRegister}/>
                <Route path = '/staff/login' exact component = {AirlineStaffLogin}/>
                <Route path = '/staff/menu' exact component = {AirlineStaffMenu}/>
                <Route path = '/staff/createFlight' exact component = {AirlineStaffCreateFlight}/>
                <Route path = '/staff/changeFlightStatus' exact component = {AirlineStaffChangeStatus}/>
                <Route path = '/staff/createAirport' exact component = {AirlineStaffCreateAirport}/>
                <Route path = '/staff/seeAirplanes' exact component = {AirlineStaffSeeAirplanes}/>
                <Route path = '/staff/viewBookingAgents' exact component = {AirlineStaffViewBookingAgents}/>
                <Route path = '/staff/viewFlights' exact component = {AirlineStaffViewFlights} />
                <Route path = '/staff/viewRates' exact component = {AirlineStaffViewRates} />
                
                //No Login
                <Route path = '/search/searchFlight' exact component = {SearchFlight}/>
            </Switch>
        </BrowserRouter>
    );
}