// ViewBooking.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function ViewBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from an API and set state
    setBookings([{ id: 1, name: "Booking 1" }, { id: 2, name: "Booking 2" }]); // Mock data
  }, []);

  return (
    <List>
      {bookings.map((booking) => (
        <ListItem key={booking.id}>
          <ListItemText primary={booking.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default ViewBooking;
