import React, {useEffect, useState} from 'react';
import api from '../../../services/api';
import './index.css'

export default function BookingAgentViewTransaction({history}){
    const [transactions, setTransactions] = useState([]);

    const bookingAgent = localStorage.getItem('bookingAgent');

    useEffect(()=>{
        if(!bookingAgent) history.push('/agent/login');
        getTransactions();
    },[]);

    console.log("frontend " , bookingAgent);
    const getTransactions = async () => {
        try {
            const response = await api.get(`/agent/viewTransaction`, {headers: {bookingAgent}});
            setTransactions(response.data.transactions);
        } catch (error) {
            throw Error({message:`Error!`});
        }
    }

    return (
        <>
            <p>Agent Transactions</p>
            <ul className = "transactions-list">
                {transactions.map(transaction=>(
                    <li key={transaction._id}>
                        <span>transaction ID: {transaction.transaction_ID}</span>
                        <span>ticket ID: {transaction.ticket_ID}</span>
                        <span>agent: {transaction.agent_email}</span>
                        <span>customer email: {transaction.customer_email}</span>
                    </li>
                ))}
            </ul>
        </>

    )
}