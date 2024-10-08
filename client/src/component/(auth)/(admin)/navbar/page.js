// TopNavbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton, Box, Badge, Paper } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from '@/redux/userSlice';

const TopNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsMenu, setNotificationsMenu] = useState(null);
  const [messagesMenu, setMessagesMenu] = useState(null);
  debugger
  // Access userDetails from the Redux store
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userDetails); // Correctly access userDetails
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenu = (event) => {
    setNotificationsMenu(event.currentTarget);
  };

  const handleMessagesMenu = (event) => {
    setMessagesMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setNotificationsMenu(null);
    setMessagesMenu(null);
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#fff', color: '#000', height: '60px' }}>
      <Toolbar style={{ minHeight: '60px', display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Company Logo or Name */}
        <Paper variant="outlined">
          <img src="emporiumlogo.png" height={40} width={200} alt="Company Logo" />
        </Paper>

        {/* Center: Notification and Message Icons */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" onClick={handleNotificationsMenu}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMessagesMenu} style={{ marginLeft: '8px' }}>
            <Badge badgeContent={10} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" onClick={handleMenu} color="inherit" style={{ marginLeft: '16px' }}>
            <Avatar alt="User Photo" src="imporiumlogo.png" />
            <Typography variant="body1" style={{ marginLeft: '10px' }}>
              {userData?.user?.email || 'Guest'} {/* Fetch email here */}
            </Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Person fontSize="small" style={{ marginRight: '10px' }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Lock fontSize="small" style={{ marginRight: '10px' }} />
              Change Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" style={{ marginRight: '10px' }} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationsMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(notificationsMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Notification 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Notification 2</MenuItem>
        </Menu>

        {/* Messages Menu */}
        <Menu
          anchorEl={messagesMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(messagesMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Message 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Message 2</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
