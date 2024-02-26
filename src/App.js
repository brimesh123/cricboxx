import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
// Import your created components here
import AddGround from './components/AddGround'
import Dashboard from './components/Dashboard';

import ViewBooking from './components/ViewBooking';
import EditGround from './components/EditGround';
import ViewList from './components/ViewList';
import TimeSlots from './components/TimeSlots';
import { Box } from '@mui/material';


function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '240px' }}> {/* Adjust marginLeft to match your sidebar's width */}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-ground" element={<AddGround />} />
          <Route path="/view-booking" element={<ViewBooking />} />
          <Route path="/edit-ground" element={<EditGround />} />
          <Route path="/edit-ground/:id" element={<EditGround />} />

          <Route path="/view-list" element={<ViewList />} />
          <Route path="/time-slots" element={<TimeSlots />} />
        </Routes>
        </Box>
      </div>
    </Router>
  );
}

export default App;
