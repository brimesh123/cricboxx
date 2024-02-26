import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid, CircularProgress, Snackbar, Alert } from '@mui/material';
import './ViewList.css'; // Importing CSS for animations
import { useNavigate } from 'react-router-dom';

function ViewList() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrounds = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/grounds');
        if (!response.ok) throw new Error('Data could not be fetched!');
        const data = await response.json();
        setGrounds(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ground?');
    if (!confirmDelete) {
      return; // Stop if the user cancels the action
    }
  
    try {
      const response = await fetch(`http://localhost:5000/grounds/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Could not delete ground.'); // Or handle the error more gracefully
      }
  
      // Update the grounds list by filtering out the deleted ground
      setGrounds(grounds.filter((ground) => ground._id !== id));
  
      // Optionally, show a success message
      setSnackbarMessage('Ground deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      // Optionally, show an error message
      setSnackbarMessage('Failed to delete ground.');
      setOpenSnackbar(true);
    }
  };
  
  

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {grounds.map((ground) => (
        <Grid item xs={12} sm={6} md={4} key={ground._id}>
          <Card raised>
            <CardActionArea>
              {ground.photos && ground.photos[0] && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:5000/${ground.photos[0]}`} // Adjust the URL as necessary
                  alt={ground.groundName}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {ground.groundName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {ground.location}<br/>
                  Price Per Hour: ${ground.pricePerHour}<br/>
                  Mobile: {ground.mobileNumber}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" className="animated-button" onClick={() => navigate(`/edit-ground/${ground._id}`)}>
                Edit
              </Button>
              <Button size="small" color="secondary" className="animated-button" onClick={() => handleDelete(ground._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default ViewList;
