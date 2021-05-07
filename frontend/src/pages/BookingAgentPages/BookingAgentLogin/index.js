import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Input, Alert } from 'reactstrap';

export default function BookingAgentLogin({history}){
    const [email, setAgentEmail] = useState("");
    const [password, setAgentPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async evt =>{
        evt.preventDefault();

        try {
            if(email!=="" && password !==""){
                const response = await api.post('/user/agent/login', {email, password});
                const bookingAgent_object_id = response.data.agent_id || false;
                const bookingAgent = response.data.bookingAgent || false;
                const agent_email = response.data.agent_email || false;

                if(bookingAgent&&bookingAgent_object_id){
                    localStorage.setItem('bookingAgent_object_id', bookingAgent_object_id);
                    localStorage.setItem('bookingAgent', bookingAgent);
                    localStorage.setItem('agent_email', agent_email);

                    history.push('/agent/menu');

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
            Promise.reject(error);
            console.log(error);
        }
    }
    return (
        <Container>
          <h2>Login:</h2>
          <p>Please<strong>Agent Login</strong> to your account</p>
          <Form onSubmit={handleSubmit}>
            <div className="input-group">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={evt=>setAgentEmail(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setAgentPassword(evt.target.value)}/>
              </FormGroup>
            </div>
            <FormGroup>
              <Button className ="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
              <Button className ="secondary-btn" onClick={()=>history.push('/user/customer/register')}>New Account</Button>
            </FormGroup>
          </Form>
          {error?(
            <Alert className="event-validation" color="danger">{errorMessage}</Alert>
          ): ""}
        </Container>
        );
}