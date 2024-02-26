import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';


function EditGround() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [groundDetails, setGroundDetails] = useState({
    groundName: '',
    location: '',
    pricePerHour: '',
    mobileNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroundDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/grounds/${id}`);
        if (!response.ok) throw new Error(`Could not fetch ground details: ${response.statusText}`);
        const data = await response.json();
        setGroundDetails(data);
      } catch (error) {
        setError(`Fetch failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGroundDetails();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroundDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/grounds/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(groundDetails),
      });
      if (!response.ok) throw new Error(`Update failed: ${response.statusText}`);
      setSnackbarMessage('Ground updated successfully!');
      setOpenSnackbar(true);
      navigate('/view-list'); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6">Edit Ground</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="groundName"
        label="Ground Name"
        type="text"
        value={groundDetails.groundName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="location"
        label="Location"
        type="text"
        value={groundDetails.location}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="pricePerHour"
        label="Price Per Hour"
        type="number"
        InputProps={{
          startAdornment: <Typography variant="span">$</Typography>,
        }}
        value={groundDetails.pricePerHour}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="mobileNumber"
        label="Mobile Number"
        type="tel"
        value={groundDetails.mobileNumber}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Update Ground
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
        </Snackbar>

    </Box>
  );
}

export default EditGround;
