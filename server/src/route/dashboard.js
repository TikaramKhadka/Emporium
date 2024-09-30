const Router = require('express');
const { getCounts } = require('../controllers/dashboard');
const DashboardRoute = Router();

// Route to get all counts
DashboardRoute.get('/counts', getCounts);

module.exports = DashboardRoute;