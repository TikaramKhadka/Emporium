// src/components/SummaryData.js
'use client'
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';

const SummaryData = () => {
    const [counts, setCounts] = useState(null);

    // Fetch data from the backend
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/counts`);  // Ensure this API endpoint is correct
                setCounts(response.data);
            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };
        fetchCounts();
    }, []);

    // Icon and color mapping based on title
    const iconMapping = {
        Users: {
            icon: <PeopleIcon />,
            color: '#60BFC1'  // Light Blue
        },
        Products: {
            icon: <InventoryIcon />,
            color: '#ff9600'  // Orange
        },
        Categories: {
            icon: <CategoryIcon />,
            color: '#f44336'  // Red
        },
        Brands: {
            icon: <ApartmentRoundedIcon/>,
            color: '#82CA9D'  // Green
        },
        Orders: {
            icon: <ShoppingCartIcon />,
            color: '#82CA9D'  // Purple
        },
        Sales: {
          icon: <AttachMoneyIcon />,
          color: '#8884D8',
      }
    };

    if (!counts) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {Object.entries(counts).map(([key, item]) => (
                <Grid item xs={12} sm={6} md={4} xl={2} key={key}>
                    <Card sx={{ display: 'flex', alignItems: 'center', padding: 1, boxShadow: 3 }}>
                        {/* Use the color and icon from iconMapping */}
                        <Avatar sx={{ backgroundColor: iconMapping[item.title].color, marginRight: 1, marginLeft: 1 }}>
                            {iconMapping[item.title].icon} {/* Icon for each item */}
                        </Avatar>
                        <CardContent>
                            <Typography className='font-bold' component="div">
                                {item.title}
                            </Typography>
                            <Typography className='font-semibold' color="text.primary">
                                {item.count}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default SummaryData;
