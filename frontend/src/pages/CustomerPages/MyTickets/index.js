import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import moment from 'moment'
import './mytickets.css'
import { Button } from 'reactstrap';

export default function MyTickets({history}){
    const [tickets, setTickets] = useState([]);
    const [totalSpending, setTotalSpending] = useState("");
    // const customer_object_id = localStorage.getItem('customer_object_id');
    const customer = localStorage.getItem('customer');
    
    useEffect(()=>{
        if(!customer) history.push('/customer/login');
        getTickets();
    }, [])

    const getTickets = async () => {
        try {
            const response = await api.get(`/mytickets`, {headers: {customer}});
            setTickets(response.data.customerInTickets);
            setTotalSpending(response.data.totalSpending);
            
        } catch (error) {
            history.push('/customer/login')
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem('customer');
        localStorage.removeItem('customer_object_id');
        history.push('/customer/login');
    }
    return (
        <>
            <div>
                <Button color="danger" onClick={logoutHandler}>Logout</Button>
            </div>
            <p>Total Spending: {totalSpending}</p>
            <ul className="tickets-list">
                {tickets.map(ticket=>(
                    <li key={ticket._id}>
                        <strong>{ticket.airline_name}</strong>
                        <span>Flight Number: {ticket.flight_number}</span>
                        <span>Sold Price: ${parseFloat(ticket.sold_price).toFixed(2)}</span>
                        <span>Card Type: {ticket.card_type}</span>
                        <span>Card Number: {ticket.card_num}</span>
                        <span>Name On Card: {ticket.name_on_card}</span>
                        <span>Expiration Date: {moment(ticket.expiration_date).format('l')}</span>
                        <span>Purchase Date: {moment(ticket.purchase_date).format('l')}</span>
                        <span>Purchase Time: {moment(ticket.purchase_time).format('h:mm')}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}