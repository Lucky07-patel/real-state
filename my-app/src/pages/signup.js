import React from 'react';
import { Container, Typography, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';


const Signup = () => {
  const { handleSubmit, control, formState: { errors } ,reset} = useForm();
  const router = useRouter(); // Access the router

  const onSubmit = (data) => {
    console.log(data); // You can remove this line if you don't need to log the form data
  
    axios.post('http://localhost:8080/api/user/signup', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          reset();
          toast.success('Signup success');
          router.push('/login');
          console.log(response.data);
        } else {
          throw new Error('API request failed');
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast.error('This email is already registered');
        } else {
          toast.error('An error occurred while signing up.');
        }
        console.error(error);
      });
  };
  

  const errorTextStyle = {
    color: 'red', // Set the text color to red for error messages
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            rules={{ required: 'First Name is required' }}
            render={({ field }) => (
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.firstName && <p style={errorTextStyle}>{errors.firstName.message}</p>}
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            rules={{ required: 'Last Name is required' }}
            // render(({ field }) => (
            //   <TextField
            //     label="Last Name"
            //     fullWidth
            //     margin="normal"
            //     {...field}
            //   />
            // )
            render={({ field }) => (
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.lastName && <p style={errorTextStyle}>{errors.lastName.message}</p>}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...field}
              />
            )}
          />
          {errors.email && <p style={errorTextStyle}>{errors.email.message}</p>}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              validate: (value) => {
                if (value.length < 8) {
                  return 'Password must be at least 8 characters';
                }
                return true;
              },
            }}
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
          {errors.password && <p style={errorTextStyle}>{errors.password.message}</p>}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                >
                  <MenuItem value="landlord">Landlord</MenuItem>
                  <MenuItem value="tenant">Tenant</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          {errors.role && <p style={errorTextStyle}>{errors.role.message}</p>}
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
