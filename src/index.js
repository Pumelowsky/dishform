import React from 'react';
import ReactDOM from 'react-dom/client';
import DishForm from './DishForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Container>
      <Row className="justify-content-md-center align-items-center">
        <Col md="4" className='mx-auto mt-3'>
          <DishForm /> 
        </Col>
      </Row>
    </Container>
  </React.StrictMode>
);
