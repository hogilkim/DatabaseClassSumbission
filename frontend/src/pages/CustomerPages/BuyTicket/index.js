import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export default function BuyTicket({history}){
        const [ticket_ID, setTicketID] = useState("");
        const [airline_name, setAirlineName] = useState("");
        const [flight_number, setFlightNumber] = useState("");
        const [sold_price, setSoldPrice] = useState("");
        const [card_type, setCardType] = useState("");
        const [card_num, setCardNum] = useState("");
        const [name_on_card,setNameOnCard] = useState("");
        const [expiration_date, setExpirationDate] = useState("");
        const [transaction_id, setTransactionID] = useState("");
        const [customer_email, setEmail] = useState("");

        const [error, setError] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");

        const customer = localStorage.getItem('customer');
        if(!customer){
            history.push('/customer/login')
        }
        const handleSubmit = async evt=>{
            evt.preventDefault();
            try{
                if (ticket_ID!==""&& airline_name!==""&& flight_number!==""&& sold_price!==""&& card_type!==""&& card_num!==""&& name_on_card!==""&& expiration_date!==""){
                    const commision_price = 0;
                    const ticketResponse = await api.post('/ticket/new', {ticket_ID, customer_email, airline_name, flight_number, sold_price, card_type, card_num, name_on_card, expiration_date});
                    const transactionResponse = await api.post('/transaction/new', {ticket_ID, customer_email, commision_price, transaction_id});
                    if(ticketResponse && transactionResponse){
                        history.push('/customer/mytickets');
                    }
                } else {
                    setError(true);
                    setErrorMessage("You need to fill all the inputs!");
                    setTimeout(()=>{
                      setError(false);
                      setErrorMessage("");
                    },2000);
                  }
            } catch (error){
                console.log("error in customer register: ", error);
                setError(true);
                setErrorMessage("Error!");
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
            <h2>Customer Buy Ticket</h2>
            <Form onSubmit={handleSubmit}>
                <div className = "input-group">
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="ticket id" onChange={evt=>setTicketID(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Airline Name" onChange={evt=>setAirlineName(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Flight Number" onChange={evt=>setFlightNumber(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="number" placeholder="Sold Price" onChange={evt=>setSoldPrice(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Card Type" onChange={evt=>setCardType(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Card Num" onChange={evt=>setCardNum(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Name On Card" onChange={evt=>setNameOnCard(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="date" placeholder="Expiration Date" onChange={evt=>setExpirationDate(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Transaction ID" onChange={evt=>setTransactionID(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" placeholder="Customer Email" onChange={evt=>setEmail(evt.target.value)}/>
                </FormGroup>

                </div>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
            </Form>
            {error?(
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ): ""}
        </Container>
    )

}