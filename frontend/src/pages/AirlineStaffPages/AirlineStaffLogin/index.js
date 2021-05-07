import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

export default function AirlineStaffLogin( {history}){
    const [staff_username, setStaffUsername] = useState("");
    const [staff_password, setStaffPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async evt=>{
        evt.preventDefault();
    
        try {
            if(staff_username!=="" && staff_password!==""){
                console.log("frontend",staff_username, staff_password)//!----------------------
                const response = await api.post('/user/staff/login', {staff_username, staff_password});
                const airlineStaff = response.data.airlineStaff || false;
                const staff_object_id = response.data.staff_object_id || false;
                const airline_name = response.data.airline_name || false;

                if (airlineStaff && staff_object_id){
                    localStorage.setItem('airlineStaff', airlineStaff);
                    localStorage.setItem('staff_object_id', staff_object_id);
                    localStorage.setItem('airline_name', airline_name);

                    history.push('/staff/menu');
                    
                } else {
                    const {message} = response.data;
                    console.log(message);
                }
            } else {
                setError(true);
                setErrorMessage("You need to fill all the inputs");
                setTimeout(()=>{
                  setError(false);
                  setErrorMessage("");
                }, 2000);
              }
        } catch (error) {
            console.log(error);
            setError(true);
            setErrorMessage("Login Failed");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000);
            Promise.reject(error);
        }
    }
    return (
        <Container>
          <h2>Login:</h2>
          <p>Please<strong>Staff Login</strong> to your account</p>
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="email" id="exampleEmail" placeholder="Your Username" onChange={evt=>setStaffUsername(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="examplePassword" placeholder="Your Password" onChange={evt=>setStaffPassword(evt.target.value)}/>
              </FormGroup>
            </div>
            <FormGroup>
              <Button className ="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
              <Button className ="secondary-btn" onClick={()=>history.push('/staff/register')}>New Account</Button>
            </FormGroup>
          </Form>
          {error?(
            <Alert className="event-validation" color="danger">{errorMessage}</Alert>
          ): ""}
        </Container>
        );
}