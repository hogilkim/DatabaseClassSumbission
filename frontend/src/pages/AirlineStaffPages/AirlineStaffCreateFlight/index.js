import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import moment from 'moment'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function AirlineStaffCreateFlight({history}){
    const staff_object_id = localStorage.getItem('staff_object_id');
    const airlineStaff = localStorage.getItem('airlineStaff');
    const airline_name = localStorage.getItem('airline_name');
    
    if (!airlineStaff) history.push('/staff/login');


    const [flight_number,setFlightNumber ] = useState("");
    const [depart_airport, setDepartAirport]= useState("");
    const [depart_time, setDepartTime]= useState("");
    const [depart_date, setDepartDate] = useState("");
    const [arrival_airport, setArrivalAirport] = useState("");
    const [arrival_time, setArrivalTime] = useState("");
    const [arrival_date, setArrivalDate] = useState("");
    const [base_price, setBasePrice] = useState("");
    const [airplane_id, setAirplaneId] = useState("");
    const [status, setStatus] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const logoutHandler = () => {
        localStorage.removeItem('staff_object_id');
        localStorage.removeItem('airlineStaff');
        localStorage.removeItem('airline_name');
        history.push('/staff/login');
    }

    const handleSubmit = async evt=>{
        evt.preventDefault();
        
        try {
            if (airplane_id!=""&&flight_number!==""&& depart_airport!==""&& depart_time!==""&& depart_date!==""&& arrival_airport!==""&& arrival_time!==""&& arrival_date!==""&& base_price!==""&& status!==""){
                const response = await api.post('/staff/createFlight', { flight_number, airplane_id, airline_name, depart_airport, depart_time, depart_date, arrival_airport, arrival_time, arrival_date, base_price, status})
                console.log("frontend create flight")
                history.push('/staff/menu');
            } else {
                setError(true);
                setErrorMessage("You need to fill all the inputs!");
                setTimeout(()=>{
                  setError(false);
                  setErrorMessage("");
                },2000);
            }
        } catch (error) {
            console.log("error in staff create Flight: ", error);

            setError(true);
            setErrorMessage("Error! Please Check you have filled inputs correctly");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000);
            Promise.reject(error);
        }
    }

    return (
        <Container>
            <h2><strong>Create Flight</strong></h2>
            <Form onSubmit = {handleSubmit}>
                <div className = "input-group">
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" placeholder="Flight Number" onChange={evt=>setFlightNumber(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" placeholder="depart airport" onChange={evt=>setDepartAirport(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Depart Time</Label>
                        <Input type="time" placeholder="deaprt time" onChange={evt=>setDepartTime(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Depart Date</Label>
                        <Input type="date" placeholder="depart date" onChange={evt=>setDepartDate(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" placeholder="Arrival Airport" onChange={evt=>setArrivalAirport(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Arrival Time</Label>
                        <Input type="time" placeholder="Arrival Time" onChange={evt=>setArrivalTime(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label className="mr-sm-2">Arrival Date</Label>
                        <Input type="date" placeholder="Arrival Date" onChange={evt=>setArrivalDate(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="number" placeholder="Base Price" onChange={evt=>setBasePrice(evt.target.value)}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input type="text" placeholder="Airplane ID" onChange={evt=>setAirplaneId(evt.target.value)}/>
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