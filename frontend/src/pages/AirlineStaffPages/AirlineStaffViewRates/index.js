import React, {useEffect, useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import './rating.css'

export default function BookingAgentViewRates(req, res){
    const [rates, setRates] = useState([]);
    const [flight_number, setFlightNumber] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async evt=> {
        evt.preventDefault();
        try {
            if (flight_number!==""){
                const response = await api.get('/staff/viewRatings', {headers: {flight_number}});
                console.log(response.data);
                if(response!==[]){
                    setRates(response.data);
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
            console.log("error in search rating: ", error);
            setError(true);
            setErrorMessage("No Rating");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000)
            Promise.reject(error);
        }
    }

    return (
        <Container>
            <h2>Search Rating</h2>
            <Form onSubmit={handleSubmit}>
                <div className="input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" placeholder="flight number" onChange={evt=>setFlightNumber(evt.target.value)}/>
                    </FormGroup>
                </div>
            <FormGroup>
                <Button className="submit-btn">Submit</Button>
            </FormGroup>
            {error?(
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ): ""}
            <ul className="ratings-list">
                {rates.map(rate=>(
                    <li key={rate._id}>
                        <strong>{rate.flight_number}</strong>
                        <span>Customer Email: {rate.customer_email}</span>
                        <span>Ticket ID: {rate.ticket_ID}</span>
                        <span>Comment: {rate.comment}</span>
                        <span>Rate: {rate.rate}</span>
                    </li>
                ))}
            </ul>



            </Form>
        </Container>
    );

}