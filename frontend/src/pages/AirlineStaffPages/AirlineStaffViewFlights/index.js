import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import { Button } from 'reactstrap';
import moment from 'moment'

export default function AirlineStaffViewFlights({history}){
    const [flights, setFlights] = useState([]);

    const airlineStaff = localStorage.getItem('airlineStaff');

    if(!airlineStaff) history.push('/staff/login');
    useEffect(()=>{
        getFlights();
    }, [])

    const getFlights = async () => {
        try {
            const response = await api.get('/staff/viewFlights', {headers:{airlineStaff}});
            console.log("frontend see airplanes", response.data.flights);
            setFlights(response.data.flights);
        } catch (error) {
            history.push('/staff/menu');
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
                {flights.map(flight=>(
                    <li key={flight._id}>
                        <strong>{flight.flight_number}</strong>
                        <span>airline: {flight.airline_name}</span>
                        <span>depart time: {moment(flight.depart_time).format('h:mm')}</span>
                        <span>depart date: {moment(flight.depart_date).format('l')}</span>
                        <span>arrival time: {moment(flight.arrival_time).format('h:mm')}</span>
                        <span>arrival date: {moment(flight.arrival_date).format('l')}</span>
                        <span>base price: {flight.base_price}</span>
                        <span>status: {flight.status}</span>
                        <span>depart airport: {flight.depart_airport}</span>
                        <span>arrival airport: {flight.arrival_airport}</span>
                        <span>airplane id: {flight.airplane_id}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}