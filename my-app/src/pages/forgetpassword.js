import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password, e.g., send a reset link to the provided email
    console.log(`Request password reset for email: ${email}`);
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
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            style={buttonStyle} // Apply the button style
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
