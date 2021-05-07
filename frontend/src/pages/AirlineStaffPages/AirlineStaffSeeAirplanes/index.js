import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import { Button } from 'reactstrap';
import './seeairplanes.css'

export default function AirlineStaffSeeAirplanes({history}){
    const [airplanes, setAirplanes] = useState([]);

    const airlineStaff = localStorage.getItem('airlineStaff');
    const airline_name = localStorage.getItem('airline_name');
    
    console.log("local storage",airline_name);
    
    if(!airlineStaff) history.push('/staff/login');
    useEffect(()=>{
        getAirplanes();
    }, [])

    const getAirplanes = async () => {
        try {
            const response = await api.get('/staff/seeAirplanes', {headers: {airlineStaff}});
            console.log("frontend see airplanes:", response.data.airplanes);
            setAirplanes(response.data.airplanes);
            
        } catch (error) {
            history.push('/staff/menu')
        }
    }
    

    const logoutHandler = () => {
        localStorage.removeItem('airlineStaff');
        localStorage.removeItem('staff_object_id');
        localStorage.removeItem('airline_name');
        history.push('/staff/login');
    }

    return (
        <>
            <div>
                <Button color="danger" onClick={logoutHandler}>Logout</Button>
            </div>
            <ul className="airplanes-list">
                {airplanes.map(airplane=>(
                    <li key={airplane._id}>
                        <strong>{airplane.airline_name}</strong>
                        <span>airplane id: {airplane.airplane_id}</span>
                    </li>
                ))}
            </ul>
        </>
    )             


    }