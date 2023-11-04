import React from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', data); // Replace with your login API endpoint
      if (response.status === 200) {
        // Successful login, you can redirect to a dashboard or do something with the response
        toast.success('Login Successful');
        localStorage.setItem('userId', response.data.user._id);

      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      toast.error('Signup sucess');
      console.error('API request failed:', error);
    }
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
    background: 'blue',
    color: 'white',
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={formStyle}>
        <Typography variant="h5" component="h2" gutterBottom>
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            style={buttonStyle}
            fullWidth
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
