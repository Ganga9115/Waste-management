// waste-management-backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authMiddleware'); // Your authentication middleware

// Route to get all dashboard data for the authenticated user
router.get('/', authenticate, dashboardController.getDashboardData);

module.exports = router;