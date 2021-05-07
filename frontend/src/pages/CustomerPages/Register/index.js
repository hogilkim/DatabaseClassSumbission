import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import "./register.css"

export default function Register( {history} ){
    const [customer_name, setCustomerName] = useState("") ;
    const [customer_email, setEmail] = useState("");
    const [customer_password, setPassword] = useState("");
    const [building_number, setBuildingNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [customer_phone_number, setCustomerPhoneNumber] = useState("");
    const [passport_number, setPassportNumber] = useState("");
    const [passport_expiration, setPassportExpiration] = useState("");
    const [passport_country, setPassportCountry] = useState("");
    const [date_of_birth, setDate] = useState("");
    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async evt=>{
      evt.preventDefault();
        

      try {
        if(customer_name!==""&& customer_email!==""&& customer_password !== "" && building_number !== "" && street !== "" && city !== "" && 
        state !== "" && customer_phone_number !== "" && passport_number !== "" && passport_expiration !== "" && passport_country !== "" && date_of_birth !== ""){

          const response = await api.post('/user/customer/register',{ customer_name, customer_email, customer_password, building_number, street,
          city, state, customer_phone_number, passport_number, passport_expiration, passport_country, date_of_birth});
          const customer_email_address = response.data.customer_email || false;
          console.log("email:", customer_email_address);

          if (customer_email_address){
            history.push('/customer/login')
          } else {
            const {message} = response.data;
            console.log(message);
          }
  
        } else {
          setError(true);
          setErrorMessage("You need to fill all the inputs!");
          setTimeout(()=>{
            setError(false);
            setErrorMessage("");
          },2000);
        }
        
      } catch (error) {
        console.log("error in customer register: ", error);
        setError(true);
        setErrorMessage("Error! Maybe email address already exists!");
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
        <h2>Customer Register:</h2>
        <p>Please<strong>Register</strong> as a new customer</p>
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="email" id="exampleName" placeholder="Your Name" onChange={evt=>setCustomerName(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={evt=>setEmail(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setPassword(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="exampleBuildingNumber" placeholder="Building Number" onChange={evt=>setBuildingNumber(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="exampleStreet" placeholder="Street" onChange={evt=>setStreet(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="exampleCity" placeholder="City" onChange={evt=>setCity(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="exampleState" placeholder="State" onChange={evt=>setState(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="examplePhone" placeholder="Phone Number" onChange={evt=>setCustomerPhoneNumber(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="examplePassportNumber" placeholder="Passport Number" onChange={evt=>setPassportNumber(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleExpirationDate" className="mr-sm-2">Passport Expiration Date</Label>
              <Input type="date" name="date" id="exampleExpirationDate" placeholder="Passport Expiration Date" onChange={evt=>setPassportExpiration(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="text" name="text" id="examplePassportCountry" placeholder="US" onChange={evt=>setPassportCountry(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="exampleBirthDate" className="mr-sm-2">Date of Birth</Label>
              <Input type="date" name="date" id="exampleBirthDate" placeholder="" onChange={evt=>setDate(evt.target.value)}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button className="submit-btn">Submit</Button>
          </FormGroup>
          <FormGroup>
            <Button className ="secondary-btn" onClick={()=>history.push('/customer/login')}>Login</Button>
          </FormGroup>
        </Form>
        {error?(
          <Alert className="event-validation" color="danger">{errorMessage}</Alert>
        ): ""}
      </Container>
      );
}