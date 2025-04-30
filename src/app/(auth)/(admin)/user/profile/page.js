'use client'
import React, { useState } from "react";
import { Box, Grid, Paper, Typography, Avatar, List, ListItem, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userDetails); 
  const [selectedMenu, setSelectedMenu] = useState("My Orders");

  const menuItems = {
    "My Orders": "Here is a list of all your orders. You can track your orders, check their status, or make a return.",
    "My Rewards": "Check your reward points, redeem them for discounts, and view your reward history.",
    "Personal Information": "Update your personal information like name, email, and contact details.",
    "Wish List": "Customize your account settings, change your password, and manage preferences.",
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={2}>
        {/* Right Side - Content */}
        <Grid item xs={12} md={10}>
          <Paper sx={{ padding: 3, height: "100%" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {selectedMenu}
            </Typography>
            <Typography variant="body1">
              {menuItems[selectedMenu]}
            </Typography>
          </Paper>
        </Grid>

        {/* Left Side */}
        <Grid item xs={12} md={2}>
          <Paper sx={{ padding: 2 }}>
            {/* Profile Picture and Info */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                alt="Profile Picture"
                src={userData?.user?.userImage ? userData.user.userImage : "/image/user.png"}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {userData?.user?.name || 'Guest'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userData?.user?.email || 'Guest'}
              </Typography>
            </Box>

            {/* Menu List */}
            <List>
              {Object.keys(menuItems).map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleMenuClick(item)}
                  selected={selectedMenu === item}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "primary.light",
                      color: "white",
                    },
                  }}
                >
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
