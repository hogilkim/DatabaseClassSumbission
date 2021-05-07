import React, {useState} from 'react';
import api from '../../../services/api'
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';


export default function Login( {history} ){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async evt=>{
      evt.preventDefault();

      try {
        if(email !== "" && password !== ""){
          const response = await api.post('/user/customer/login',{ email, password });
          const customer_object_id = response.data.customer_id || false;
          const customer = response.data.customer || false;
          // const customer_email = response.data.customer_email || false;
    
          if (customer&&customer_object_id){
            localStorage.setItem('customer_object_id', customer_object_id);
            localStorage.setItem('customer', customer);
            // localStorage.setItem('customer_email', customer_email);
            history.push('/customer/mytickets')
          } else {
            const {message} = response.data;
            console.log(message);
          }
        } else {
          setError(true);
          setErrorMessage("You need to fill all the inputs");
          setTimeout(()=>{
            setError(false);
            setErrorMessage("");
          }, 2000);
        }

        
      } catch (error) {
        console.log(error);
        setError(true);
        setErrorMessage("Login Failed");
        setTimeout(()=>{
            setError(false);
            setErrorMessage("");
        }, 2000);
        Promise.reject(error);
      }

    }

    return (
      <Container>
        <h2>Login:</h2>
        <p>Please<strong>Customer Login</strong> to your account</p>
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={evt=>setEmail(evt.target.value)}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setPassword(evt.target.value)}/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button className ="submit-btn">Submit</Button>
          </FormGroup>
          <FormGroup>
            <Button className ="secondary-btn" onClick={()=>history.push('/user/customer/register')}>New Account</Button>
          </FormGroup>
        </Form>
        {error?(
          <Alert className="event-validation" color="danger">{errorMessage}</Alert>
        ): ""}
      </Container>
      );
}