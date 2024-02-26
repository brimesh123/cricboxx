// TimeSlots.js
import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

function TimeSlots() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    // TODO: Fetch time slots from your API
    console.log('Fetching time slots');
    // Mock data for display
    setSlots([
      { id: 1, slot: "9:00 - 10:00", groundId: 1 },
      { id: 2, slot: "10:00 - 11:00", groundId: 1 },
    ]);
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6">Time Slots</Typography>
      {slots.map((slot) => (
        <Typography key={slot.id}>{`${slot.slot} for Ground ID: ${slot.groundId}`}</Typography>
      ))}
    </Paper>
  );
}

export default TimeSlots;
