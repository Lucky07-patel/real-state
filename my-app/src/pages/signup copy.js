import React, { useState } from 'react';
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';


const Signup = () => {
  const [submitting, setSubmitting] = useState(false); // State to track form submission
  const [error, setError] = useState(null); 
  const { handleSubmit, control, formState: { errors } } = useForm();


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    landlord: '',
    tenant: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit1 = (e) => {
    e.preventDefault();

    // Set the submitting state to true
    setSubmitting(true);
    console.log("formadttaaaaaaaaaaaaaa",formData);

    // Make an API call to submit the form data
    fetch('http://localhost:8080/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log("response======",response);
        if (response.ok) {
          // Successful API call
          return response.json();
        } else {
          // Handle errors
          throw new Error('API request failed');
        }
      })
      .then((data) => {
        // Handle the response data, e.g., show a success message
        console.log(data);
        setSubmitting(false); // Reset the submitting state
      })
      .catch((error) => {
        // Handle API call errors
        console.error(error);
        setError('An error occurred while signing up.');
        setSubmitting(false); // Reset the submitting state
      });
  };

  const formStyle = {
    maxWidth: '400px',
    padding: '20px',
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const buttonStyle = {
    marginTop: '20px',
    background: 'blue', // Change the background color to blue
    color: 'white', // Change the text color to white
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={formStyle}>
        <Typography variant="h5" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="landlord">Landlord</MenuItem>
              <MenuItem value="tenant">Tenant</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={buttonStyle}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
