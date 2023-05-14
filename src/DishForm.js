import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col, PageHeader } from 'react-bootstrap';
import axios from 'axios';
const DishForm = () => {
  const [name, setName] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [dishType, setDishType] = useState('');
  const [noOfSlices, setNoOfSlices] = useState('');
  const [diameter, setDiameter] = useState('');
  const [spicinessScale, setSpicinessScale] = useState('');
  const [slicesOfBread, setSlicesOfBread] = useState('');
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const validateForm = () => {
    let hasErrors = false;
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
      hasErrors = true;
    }

    if (!preparationTime) {
      errors.preparationTime = 'Preparation Time is required';
      hasErrors = true;
    } else {
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
      if (!timeRegex.test(preparationTime)) {
        errors.preparationTime = 'Preparation Time must be in format HH:MM:SS';
        hasErrors = true;
      }
    }

    if(!dishType)
    {
      errors.dishType = "You need to select dish type!";
      hasErrors = true;
    }
    // Validate Pizza Fields
  if (dishType === 'pizza') {
    if (!noOfSlices) {
      errors.noOfSlices = 'Number of Slices is required!';
      hasErrors = true;
    }

    if (!diameter) {
      errors.diameter = 'Diameter is required!';
      hasErrors = true;
    }
  }

  // Validate Soup Fields
  if (dishType === 'soup') {
    if (!spicinessScale) {
      errors.spicinessScale = 'Spiciness Scale is required!';
      hasErrors = true;
    } else {
      if(spicinessScale<1 || spicinessScale>10) {
        errors.spicinessScale = 'Spiciness Scale need to be in range 1-10!';
        hasErrors = true;
      }
    }
  }

  // Validate Sandwich Fields
  if (dishType === 'sandwich') {
    if (!slicesOfBread) {
      errors.slicesOfBread = 'Number of Slices of Bread is required';
      hasErrors = true;
    }
  }

    // Validate other fields based on the dish type

    setErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      const formData = {
        name,
        preparation_time: preparationTime,
        type: dishType,
        no_of_slices: dishType === 'pizza' ? parseInt(noOfSlices) : null,
        diameter: dishType === 'pizza' ? parseFloat(diameter) : null,
        spiciness_scale: dishType === 'soup' ? parseInt(spicinessScale) : null,
        slices_of_bread: dishType === 'sandwich' ? parseInt(slicesOfBread) : null,
      };

      const response = await axios.post('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', formData);

      // Handle successful response
      setResponseMessage(response.data);
      console.log(response.data);
      // Reset form and error state
      setName('');
      setPreparationTime('');
      setDishType('');
      setNoOfSlices('');
      setDiameter('');
      setSpicinessScale('');
      setSlicesOfBread('');
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
    <h1 class="mb-3">Dish Form</h1>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="name">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
    </Row>
    <Row className="mb-3">
    <Form.Group as={Col} controlId="preparationTime">
      <Form.Label>Preparation Time (HH:MM:SS)</Form.Label>
      <Form.Control
        type="text"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
        isInvalid={!!errors.preparationTime}
      />
      <Form.Control.Feedback type="invalid">{errors.preparationTime}</Form.Control.Feedback>
    </Form.Group>
    </Row>
    <Row className="mb-3">
    <Form.Group as={Col} controlId="dishType">
      <Form.Label>Dish Type</Form.Label>
      <Form.Control
        as="select"
        value={dishType}
        onChange={(e) => setDishType(e.target.value)}
        isInvalid={!!errors.dishType}
      >
        <option value="">Select Type</option>
        <option value="pizza">Pizza</option>
        <option value="soup">Soup</option>
        <option value="sandwich">Sandwich</option>
      </Form.Control>
      <Form.Control.Feedback type="invalid">{errors.dishType}</Form.Control.Feedback>
    </Form.Group>
    </Row>
    
    {dishType === "pizza" && (
      <React.Fragment>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="noOfSlices">
          <Form.Label>Number of Slices</Form.Label>
          <Form.Control
            type="number"
            value={noOfSlices}
            onChange={(e) => setNoOfSlices(e.target.value)}
            isInvalid={!!errors.noOfSlices}
          />
          <Form.Control.Feedback type="invalid">{errors.noOfSlices}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="diameter">
          <Form.Label>Diameter</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            isInvalid={!!errors.diameter}
          />
          <Form.Control.Feedback type="invalid">{errors.diameter}</Form.Control.Feedback>
        </Form.Group>
      </Row>
      </React.Fragment>
      
    )}

    {dishType === "soup" && (
      <Row className="mb-3">
      <Form.Group as={Col} controlId="spicinessScale">
        <Form.Label>Spiciness Scale</Form.Label>
        <Form.Control
          type="number"
          value={spicinessScale}
          onChange={(e) => setSpicinessScale(e.target.value)}
          isInvalid={!!errors.spicinessScale}
        />
        <Form.Control.Feedback type="invalid">{errors.spicinessScale}</Form.Control.Feedback>
      </Form.Group>
      </Row>
    )}

    {dishType === "sandwich" && (
      <Row className="mb-3">
      <Form.Group as={Col} controlId="slicesOfBread">
        <Form.Label>Number of Slices of Bread</Form.Label>
        <Form.Control
          type="number"
          value={slicesOfBread}
          onChange={(e) => setSlicesOfBread(e.target.value)}
          isInvalid={!!errors.slicesOfBread}
        />
        <Form.Control.Feedback type="invalid">{errors.slicesOfBread}</Form.Control.Feedback>
      </Form.Group>
      </Row>
    )}
      {responseMessage && (
        <Row className="mb-3">
          <Alert as={Col} variant="success">
            <Alert.Heading>Success! Response from API:</Alert.Heading>
            <pre>{JSON.stringify(responseMessage, false, 4)}</pre>
          </Alert>
        </Row>
      )}
      <Row className="mb-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Row>
    </Form>
  );
};

export default DishForm;
