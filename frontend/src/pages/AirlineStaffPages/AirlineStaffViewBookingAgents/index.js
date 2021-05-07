import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function ViewBookingAgents({history}){
    const [agents, setAgents] = useState([]);


    const staff = localStorage.getItem('airlineStaff');

    useEffect(()=>{
        if(!staff) history.push('/staff/login');
        getAgents();
    })

    const getAgents = async () => {
        try {
            const response = await api.get('/staff/viewBookingAgents');
            setAgents(response.data);
        } catch (error) {
            history.push('/staff/login');
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('airlineStaff');
        localStorage.removeItem('staff_object_id'); 
        localStorage.removeItem('airline_name'); 
        history.push('/customer/login');
    }
    return (
        <>
            <div>
                <Button color="danger" onClick={logoutHandler}>Logout</Button>
            </div>
            <p>Agent Lists</p>
            <ul className = "agents=list">
                {agents.map(agent=>(
                    <li key={agent._id}>
                        <strong>{agent.agent_email}</strong>
                    </li>
                ))}
            </ul>
        </>
    )
}