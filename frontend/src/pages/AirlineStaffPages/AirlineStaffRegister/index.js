import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./register.css";

export default function AirlineStaffRegister({history}){
    const [staff_username, setStaffUsername] = useState("");
    const [staff_password, setStaffPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");
    const [airline_name, setAirlineName] = useState("");
    const [staff_phone, setStaffPhone] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async evt=>{
        evt.preventDefault();

        try {
            if (staff_username !==""&& staff_password !==""&& first_name !==""&& last_name !==""&& date_of_birth !==""&& airline_name !=="" && staff_phone!==""){
                const response = await api.post('/staff/register', {staff_username, staff_password, first_name, last_name, date_of_birth, airline_name, staff_phone});
                const response_staff_username = response.data.staff_username || false;
                console.log("username: ", response_staff_username);

                if(response_staff_username){
                    history.push('/staff/login');
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

    return (
        <Container>
          <h2>Airline Staff Register:</h2>
          <p>Please <strong>Register</strong> as a new staff</p>
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="email" id="exampleName" placeholder="New Username" onChange={evt=>setStaffUsername(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setStaffPassword(evt.target.value)}/>
              </FormGroup>          
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="email" id="exampleFirstName" placeholder="First Name" onChange={evt=>setFirstName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="email" id="exampleLastName" placeholder="Last Name" onChange={evt=>setLastName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleBirthDate" className="mr-sm-2">Date of Birth</Label>
                <Input type="date" name="date" id="exampleBirthDate" placeholder="" onChange={evt=>setDateOfBirth(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="email" id="exampleLastName" placeholder="Airline Name" onChange={evt=>setAirlineName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="examplePhone" placeholder="Phone Number" onChange={evt=>setStaffPhone(evt.target.value)}/>
            </FormGroup>
            </div>
            <FormGroup>
              <Button className="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
              <Button className ="secondary-btn" onClick={()=>history.push('/staff/login')}>Login Instead?</Button>
            </FormGroup>
          </Form>
          {error?(
            <Alert className="event-validation" color="danger">{errorMessage}</Alert>
          ): ""}
        </Container>
        );
}