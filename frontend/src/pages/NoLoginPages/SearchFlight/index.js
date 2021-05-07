import React, {useEffect, useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import moment from 'moment';
import './searchFlight.css'

export default function SearchFlight({history}){
    const [flights, setFlights] = useState([]);

    const [depart_date, setDepartDate] = useState("");
    const [depart_airport, setDeparatAirport] = useState("");
    const [arrival_airport, setArrivalAirport] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    

    const handleSubmit = async evt => {
        evt.preventDefault();
        try {
            if(depart_date!==""&& depart_airport!==""&& arrival_airport!==""){
                console.log("frontend: ", depart_date, depart_airport, arrival_airport)
                const response = await api.get('/search/searchFlight', {headers: {depart_date, depart_airport, arrival_airport}});
                console.log(response.data);
                if(response!==[]){
                    setFlights(response.data);
                }
            } else {
                setError(true);
                setErrorMessage("You need to fill all the inputs!");
                setTimeout(()=>{
                  setError(false);
                  setErrorMessage("");
                },2000);
            }
        } catch (error) {
            console.log("error in search flight: ", error);
            setError(true);
            setErrorMessage("No flights");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000)
            Promise.reject(error);
        }
    }

    return (
        <Container>
            <h2>Search Flight</h2>
            <Form onSubmit={handleSubmit}>
            <div className="input-group">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label>Departure Date</Label>
                    <Input type="date" placeholder="Departure Date" onChange={evt=>setDepartDate(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Departure Airport" onChange={evt=>setDeparatAirport(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Arrival Airport" onChange={evt=>setArrivalAirport(evt.target.value)}/>
                </FormGroup>
            </div>
                <FormGroup>
                <Button className="submit-btn">Submit</Button>
                </FormGroup>
            <ul className="flights-list">
                
                {flights.map(flight=>(
                    <li key={flight._id}>
                        <strong>{flight.flight_number}</strong>
                        <span>Depart Time: {flight.depart_time}</span>
                        <span>Base Price: ${parseFloat(flight.base_price).toFixed(2)}</span>
                        <span>Depart Time: {moment(flight.depart_time).format('h:mm')}</span>
                        <span>Depart Date: {moment(flight.depart_date).format('l')}</span>
                        <span>Arrival Time: {moment(flight.arrival_time).format('h:mm')}</span>
                        <span>Arrival Date: {moment(flight.arrival_date).format('l')}</span>
                        <span>Depart Airport: {flight.depart_airport}</span>
                        <span>Arrival Airport: {flight.arrival_airport}</span>
                        <span>Airplane ID: {flight.airplane_id}</span>
                        <span>Status: {flight.status}</span>
                        <span>Airline Name: {flight.airline_name}</span>

                    </li>
                ))}
            </ul>
            </Form>
        </Container>
    )
}