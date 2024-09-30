'use client';
import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import ChartView from './chart/page';
import SummaryData from './summarydata/page';

const Dashboard = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className='m-auto'>
      {/* Container for Title and Tabs */}
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' }  // Responsive: column on small screens, row on larger screens
        }}
      >
        {/* Dashboard Title */}
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 'bold', mb: { xs: 2, sm: 0 } }} // Margin-bottom on small screens
        >
          Dashboard
        </Typography>

        {/* Tabs */}
        <Box sx={{ width: { xs: '100%', sm: 'auto' }, textAlign: { xs: 'center', sm: 'right' } }}> 
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            sx={{ minHeight: '36px' }}
            TabIndicatorProps={{ style: { backgroundColor: '#000' } }} // Optional: custom indicator color
            variant={window.innerWidth <= 600 ? 'scrollable' : 'standard'} // Responsive tab scroll behavior
          >
            <Tab 
              label="Week" 
              sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'none' }} 
            />
            <Tab 
              label="Month" 
              sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'none' }} 
            />
            <Tab 
              label="Quarter" 
              sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'none' }} 
            />
            <Tab 
              label="Year" 
              sx={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'none' }} 
            />
          </Tabs>
        </Box>
      </Box>

      {/* Conditionally rendering content based on active tab */}
      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Box>
            <SummaryData /> {/* Weekly data */}
            <ChartView />   {/* Chart for Weekly data */}
          </Box>
        )}
        {activeTab === 1 && (
          <Box>
            <SummaryData /> {/* Monthly data */}
            <ChartView />   {/* Chart for Monthly data */}
          </Box>
        )}
        {activeTab === 2 && (
          <Box>
            <SummaryData /> {/* Quarterly data */}
            <ChartView />   {/* Chart for Quarterly data */}
          </Box>
        )}
        {activeTab === 3 && (
          <Box>
            <SummaryData /> {/* Yearly data */}
            <ChartView />   {/* Chart for Yearly data */}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;
