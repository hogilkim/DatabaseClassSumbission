import React, {useState} from 'react';
import api from '../../../services/api';
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './register.css';

export default function BookingAgentRegister({history}){
    const [agent_email, setAgentEmail] = useState("");
    const [agent_password, setAgentPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async evt=>{
        evt.preventDefault();

        try {
            if(agent_email !=="" && agent_password!==""){
                const response = await api.post('/agent/register', {agent_email, agent_password});
                console.log(response.data.agent_email);
                if (response.data.agent_email){
                    history.push('/agent/login');
                } else {
                    const {message} = response.data.message;
                    console.log("error message:", message);
                    
                }
            } else {
                setError(true);
                setErrorMessage("You need to fill all the inputs!");
                setTimeout(()=>{
                    setError(false);
                    setErrorMessage("");
                }, 2000)
            }
        } catch (error) {
            console.log("error in agent register: ", error);
            setError(true);
            setErrorMessage("Error! Maybe email address already exists!");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000)
            Promise.reject(error);
        }
    }

    return (
        <Container>
        <h2>Booking Agent Register:</h2>
        <p>Please<strong>Register</strong> as a Booking Agent</p>
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
            <Button className="submit-btn">Submit</Button>
          </FormGroup>
          <FormGroup>
            <Button className ="secondary-btn" onClick={()=>history.push('/agent/login')}>Login Instead?</Button>
          </FormGroup>
        </Form>
        {error?(
          <Alert className="event-validation" color="danger">{errorMessage}</Alert>
        ): ""}
      </Container>
    )
}