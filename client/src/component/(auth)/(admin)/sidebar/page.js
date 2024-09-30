import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Link from 'next/link';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

const Sidebar = () => {
  const [openReports, setOpenReports] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // State to track the active menu
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [collapsed, setCollapsed] = useState(!isMdScreen);

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set the active menu
  };

  useEffect(() => {
    setCollapsed(!isMdScreen);
  }, [isMdScreen]);

  return (
    <Box
      className={`fixed bg-white text-black h-screen border shadow-md transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-1/6'
      }`}
      sx={{
        top: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
      }}
    >
      <Box>
        <ListItem
          className={`hover:bg-gray-100 ${activeMenu === 'Dashboard' ? 'bg-gray-300' : ''}`} // Active state styling
          onClick={() => handleMenuClick('Dashboard')}
          sx={{ justifyContent: 'initial', marginTop: '20px' }}
        >
          <Tooltip title={collapsed ? 'Dashboard' : ''} placement="right">
            <Link href="/dashboard" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Dashboard" />}
              </Box>
            </Link>
          </Tooltip>
        </ListItem>

        <Divider />

        <List>
          <ListItem
            button
            className={`hover:bg-gray-100 ${activeMenu === 'Brand' ? 'bg-gray-300' : ''}`} // Active state styling
            onClick={() => handleMenuClick('Brand')}
            sx={{ justifyContent: 'initial' }}
          >
            <Tooltip title={collapsed ? 'Brand' : ''} placement="right">
              <Link href="/brand" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <ApartmentRoundedIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Brand" />}
                </Box>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            className={`hover:bg-gray-100 ${activeMenu === 'Category' ? 'bg-gray-300' : ''}`} // Active state styling
            onClick={() => handleMenuClick('Category')}
            sx={{ justifyContent: 'initial' }}
          >
            <Tooltip title={collapsed ? 'Category' : ''} placement="right">
              <Link href="/category" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Category" />}
                </Box>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            className={`hover:bg-gray-100 ${activeMenu === 'Product' ? 'bg-gray-300' : ''}`} // Active state styling
            onClick={() => handleMenuClick('Product')}
            sx={{ justifyContent: 'initial' }}
          >
            <Tooltip title={collapsed ? 'Product' : ''} placement="right">
              <Link href="/product" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Product" />}
                </Box>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            className={`hover:bg-gray-100 ${activeMenu === 'Users' ? 'bg-gray-300' : ''}`} // Active state styling
            onClick={() => handleMenuClick('Users')}
            sx={{ justifyContent: 'initial' }}
          >
            <Tooltip title={collapsed ? 'Users' : ''} placement="right">
              <Link href="/user" passHref>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Users" />}
                </Box>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem
            button
            onClick={handleReportsClick}
            className={`hover:bg-gray-100 ${activeMenu === 'Reports' ? 'bg-gray-300' : ''}`} // Active state styling
            sx={{ justifyContent: 'initial' }}
          >
            <Tooltip title={collapsed ? 'Reports' : ''} placement="right">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary="Reports" />}
                </Box>
                {!collapsed && (
                  <Box sx={{ marginLeft: 'auto', marginRight: '8px' }}>
                    {openReports ? <ExpandLess /> : <ExpandMore />}
                  </Box>
                )}
              </Box>
            </Tooltip>
          </ListItem>

          <Collapse in={openReports && !collapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className="pl-10 hover:bg-gray-100"
                onClick={() => handleMenuClick('Sales Report')}
              >
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <Link href="/reports/sales" passHref>
                  <ListItemText primary="Sales Report" />
                </Link>
              </ListItem>
              <ListItem
                button
                className="pl-10 hover:bg-gray-100"
                onClick={() => handleMenuClick('Order Report')}
              >
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <Link href="/reports/orders" passHref>
                  <ListItemText primary="Order Report" />
                </Link>
              </ListItem>
              <ListItem
                button
                className="pl-10 hover:bg-gray-100"
                onClick={() => handleMenuClick('Cancel Report')}
              >
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <Link href="/reports/cancel" passHref>
                  <ListItemText primary="Cancel Report" />
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>

      <Box sx={{ position: 'absolute', bottom: '100px', width: '100%' }}>
        <Divider />
        <ListItem
          button
          className={`hover:bg-gray-100 ${activeMenu === 'Settings' ? 'bg-gray-300' : ''}`} // Active state styling
          sx={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center' }}
          onClick={() => handleMenuClick('Settings')}
        >
          <Tooltip title={collapsed ? 'Settings' : ''} placement="right">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Settings" />}
            </Box>
          </Tooltip>
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
