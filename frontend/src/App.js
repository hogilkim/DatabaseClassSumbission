import React from 'react';
import Routes from './routes'
import {Container} from 'reactstrap';
import './App.css';

function App() {
  return (
    <Container>
      <h1>Airline ticket reservation system</h1>
      <div className="content">
        <Routes/>
      </div>
    </Container>
  );
}

export default App;
