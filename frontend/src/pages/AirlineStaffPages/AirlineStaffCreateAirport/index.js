import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

export default function AirlineStaffCreateAirport({history}){
    const [airport_name, setAirportName] = useState("");
    const [city, setCity] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const airlineStaff = localStorage.getItem('airlineStaff');

    if(!airlineStaff){
        history.push('/staff/login');
    }


    const handleSubmit = async evt=>{
        evt.preventDefault();
        try {
            if (airport_name!=="" && city!=="" ){
                const response = await api.post('/staff/createAirport', {airport_name,
                    city});
                const response_airport = response.data.airport_name || false;

                if(response_airport){
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
            console.log("error in create airport: ", error);
            setError(true);
            setErrorMessage("Error in create airport!");
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
          <h2>Airline Staff Create Airport</h2>
          <p>Please <strong>Create New Airport</strong></p>
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="Airport Name" onChange={evt=>setAirportName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" placeholder="City" onChange={evt=>setCity(evt.target.value)}/>
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