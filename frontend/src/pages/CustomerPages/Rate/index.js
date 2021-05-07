import React, {useState} from 'react';
import api from '../../../services/api';
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function Rate({history}){
    const[ticket_ID,setTicketID] = useState("");
    const[comment, setComment] = useState("");
    const[rate, setRate] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const customer = localStorage.getItem('customer');
    if(!customer) history.push('/');

    const logoutHandler = () => {
        localStorage.removeItem('customer');
        localStorage.removeItem('customer_object_id');
        history.push('/customer/login');
    }

    const handleSubmit = async evt => {
        evt.preventDefault();

        try{
            if(ticket_ID!==""&& comment!==""&& rate!==""){
                const response = await api.post('/rating/new', {ticket_ID, comment, rate});
                if(response.data){
                    history.push('/mytickets');
                } else {
                    const {message} = response.data;
                    console.log(message);
                }
            }else{
                setError(true);
                setErrorMessage("You need to fill all the inputs!");
                setTimeout(()=>{
                    setError(false);
                    setErrorMessage("");
          },2000);
        }
        } catch (error){
            console.log("error while making new rate: ",error);
            setError(true);
            setErrorMessage("Error! Check ticket id");
            setTimeout(()=>{
                setError(false);
                setErrorMessage("");
            }, 2000)
            Promise.reject(error);
            console.log(error);
        }
    }
    
    return (
        <Container>
            <h2>Customer Rating</h2>
            <Form onSubmit={handleSubmit}>
            <div className="input-group">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text"  placeholder="ticket ID" onChange={evt=>setTicketID(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text"  placeholder="comment" onChange={evt=>setComment(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="number"  placeholder="Rate" onChange={evt=>setRate(evt.target.value)}/>
                </FormGroup>
            </div>
            <FormGroup>
                <Button className="submit-btn">Submit</Button>
            </FormGroup>
            <FormGroup>
                <Button color="danger" onClick={logoutHandler}>Logout</Button>
            </FormGroup>
            
            </Form>
        {error?(
          <Alert className="event-validation" color="danger">{errorMessage}</Alert>
        ): ""}
        </Container>
    );
    
}