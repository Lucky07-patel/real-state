import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Input, FormControl } from '@mui/material';
const CreateProperty = () => {
  const [propertyData, setPropertyData] = useState({
    rooms: '',
    parking: '',
    bathrooms: '',
    location: '',
  });

  

  const [documents, setDocuments] = useState({
    panCard: null,
    aadharCard: null,
  });

  const handleChange = (e) => {
    setPropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleDocumentChange = (e) => {
    setDocuments({
      ...documents,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle property submission, e.g., send data and documents to an API
    console.log(propertyData);
    console.log(documents);
  };

  const handleLocationSelect = ({ lat, lng, address }) => {
    // Handle the selected location here
    setPropertyData({ ...propertyData, location: `${address} (${lat}, ${lng})` });
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
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={formStyle}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create Property
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Number of Rooms"
            fullWidth
            margin="normal"
            name="rooms"
            value={propertyData.rooms}
            onChange={handleChange}
          />
          <TextField
            label="Parking Spaces"
            fullWidth
            margin="normal"
            name="parking"
            value={propertyData.parking}
            onChange={handleChange}
          />
          <TextField
            label="Number of Bathrooms"
            fullWidth
            margin="normal"
            name="bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="locationName"
            value={propertyData.location}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            {/* <Input
              type="file"
              name="panCard"
              onChange={handleDocumentChange}
            /> */}
          </FormControl>
          <FormControl fullWidth margin="normal">
            {/* <Input
              type="file"
              name="aadharCard"
              onChange={handleDocumentChange}
            /> */}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            Create Property
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateProperty;
