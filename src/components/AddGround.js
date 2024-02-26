import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';



const Input = styled('input')({
  display: 'none',
});

export default function AddGround() {
  const [groundDetails, setGroundDetails] = useState({
    groundName: '',
    location: '',
    pricePerHour: '',
    mobileNumber: '',
  });

  const [photos, setPhotos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control Snackbar visibility


  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroundDetails({ ...groundDetails, [name]: value });
  };

  const handlePhotoChange = (event) => {
    setPhotos(event.target.files);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('groundName', groundDetails.groundName);
    formData.append('location', groundDetails.location);
    formData.append('pricePerHour', groundDetails.pricePerHour);
    formData.append('mobileNumber', groundDetails.mobileNumber);
    
    // Append photos
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/add-ground', {
        method: 'POST',
        body: formData, // No headers here, as fetch adds the correct one for FormData
      });

      if (response.ok) {
        console.log('Ground added successfully');
        setOpenSnackbar(true); // Open the Snackbar

        // Reset form or handle success
        setGroundDetails({
          groundName: '',
          location: '',
          pricePerHour: '',
          mobileNumber: '',
        });
        setPhotos([]);

      } else {
        console.error('Failed to add ground');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Add Ground</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="groundName"
        label="Ground Name"
        name="groundName"
        autoComplete="groundName"
        autoFocus
        value={groundDetails.groundName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="location"
        label="Location"
        name="location"
        autoComplete="location"
        value={groundDetails.location}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="pricePerHour"
        label="Price Per Hour"
        name="pricePerHour"
        autoComplete="pricePerHour"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={groundDetails.pricePerHour}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="mobileNumber"
        label="Mobile Number"
        name="mobileNumber"
        autoComplete="mobileNumber"
        value={groundDetails.mobileNumber}
        onChange={handleChange}
      />
       <input
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handlePhotoChange}
      />
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handlePhotoChange} />
        <Button variant="contained" component="span" fullWidth>
          Upload Photos
        </Button>
      </label>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Ground
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Ground added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
