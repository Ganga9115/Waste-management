// waste-management-backend/routes/adoptBinRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
    adoptBin,
    checkAdoptionStatus,
    getMyAdoptedBins
} = require('../controllers/adoptBinController');

// Route to adopt a bin (POST) - protected
router.post('/adopt', authenticate, adoptBin);

// Route to check adoption status for a location (GET) - protected
router.get('/adoption-status', authenticate, checkAdoptionStatus);

// Route to get bins adopted by the current user (GET) - protected
router.get('/my-adopted-bins', authenticate, getMyAdoptedBins);

module.exports = router;