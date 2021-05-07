import { useHistory } from "react-router";
import React from 'react';
import api from '../../../services/api'
import { Container, Button, FormGroup} from 'reactstrap';

export default function BookingAgentMenu(){
    
    let history = useHistory();

    const bookingAgent = localStorage.getItem('bookingAgent');

    if(!bookingAgent){
        history.push('/agent/login');
    }

    const logoutHandler = () => {
        localStorage.removeItem('bookingAgent');
        localStorage.removeItem('bookingAgent_object_id');
        localStorage.removeItem('agent_email');
        history.push('/agent/login');
    }

    function purchaseTicket() {
        history.push("/agent/purchaseTicket");
    }
    function viewTransaction() {
        history.push("/agent/viewTransaction");
    }
    


    return (
        <Container>
            <h2>Choose Menu</h2>
            <FormGroup>
              <Button className ="secondary-btn" onClick={logoutHandler}>Logout</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={purchaseTicket}>Purchase Ticket</Button>
            </FormGroup>
            <FormGroup>
                <Button className ="secondary-btn" onClick={viewTransaction}>View Transaction</Button>
            </FormGroup>

        </Container>
    );
}