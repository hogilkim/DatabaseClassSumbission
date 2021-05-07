import { useHistory } from "react-router";
import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function AirlineStaffMenu(){
    
    let history = useHistory();

    const airlineStaff = localStorage.getItem('airlineStaff');

    if(!airlineStaff){
        history.push('/staff/login');
    }

    const logoutHandler = () => {
        localStorage.removeItem('airlineStaff');
        localStorage.removeItem('staff_object_id');
        localStorage.removeItem('airline_name');
        history.push('/staff/login');
    }

    function createFlight() {
        history.push("/staff/createFlight");
      }
    
    function createAirport(){
        history.push("/staff/createAirport");
    }

    function changeStatus(){
        history.push("/staff/changeFlightStatus");
    }
    function seeAirplanes(){
        history.push("/staff/seeAirplanes");
    }
    function viewBookingAgents(){
        history.push("/staff/viewBookingAgents");
    }
    function viewFlights(){
        history.push("/staff/viewFlights");
    }
    function viewRates(){
        history.push("/staff/viewRates");
    }
    return (
        <Container>
            <h2>Choose Menu</h2>
            <FormGroup>
              <Button className ="secondary-btn" onClick={logoutHandler}>Logout</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={createFlight}>Create Flight</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={changeStatus}>Change Flight Status</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={createAirport}>Create Airport</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={seeAirplanes}>See Airplanes</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={viewBookingAgents}>View Agents</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={viewFlights}>View Flights</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={viewRates}>View Rates</Button>
            </FormGroup>
        </Container>
    );
}