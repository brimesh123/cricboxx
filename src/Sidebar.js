import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

// Updated paths to reflect the structure within the ./components/ directory
const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Add Ground', icon: <AddBoxIcon />, path: '/add-ground' },
  { text: 'View Booking', icon: <BookIcon />, path: '/view-booking' },
  { text: 'View List', icon: <ViewListIcon />, path: '/view-list' },
  { text: 'Time Slots', icon: <AccessTimeIcon />, path: '/time-slots' },
];

function Sidebar() {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <DrawerHeader>
        <Typography variant="h6">App Name</Typography>
      </DrawerHeader>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item, index) => (
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
              <ListItem button sx={{ '&:hover': { backgroundColor: '#f4f4f4' } }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
}

export default Sidebar;
