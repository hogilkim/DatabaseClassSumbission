import React, {useEffect, useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function AirlineStaffChangeStatus({history}){
    const [flight_number, setFlightNumber] = useState("");
    const [status, setStatus] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const airlineStaff = localStorage.getItem('airlineStaff');

    if(!airlineStaff){
        history.push('/staff/login');
    }


    const handleSubmit = async evt=>{
        evt.preventDefault();
        try {
            if (flight_number!=="" && status!=="" ){
                const response = await api.post('/staff/changeFlightStatus', {flight_number,
                    status});
                const response_flight_number = response.data.flight_number || false;
                console.log("modified flight number: ", response_flight_number);

                if(response_flight_number){
                    history.push('/staff/menu');
                } else {
                    const {message} = response.data;
                    console.log(message);
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
            console.log("error in staff register: ", error);
            setError(true);
            setErrorMessage("Error! Maybe username already exists!");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000)
            Promise.reject(error);
        }
    }
    const logoutHandler = () => {
        localStorage.removeItem('airlineStaff');
        localStorage.removeItem('staff_object_id');
        localStorage.removeItem('airline_name');
        history.push('/staff/login');
    }
    return (
        <Container>
          <h2>Airline Staff Change Status</h2>
          <p>Please <strong>Change Status</strong> of a flight</p>
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="Flight Number" onChange={evt=>setFlightNumber(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="Status" onChange={evt=>setStatus(evt.target.value)}/>
              </FormGroup>
            </div>
            <FormGroup>
              <Button className="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
              <Button className ="secondary-btn" onClick={logoutHandler}>Logout</Button>
            </FormGroup>
            
          </Form>
          {error?(
            <Alert className="event-validation" color="danger">{errorMessage}</Alert>
          ): ""}
        </Container>
        );

}