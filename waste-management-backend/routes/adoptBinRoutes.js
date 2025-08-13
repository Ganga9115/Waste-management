// waste-management-backend/routes/adoptBinRoutes.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const {
    adoptBin,
    checkAdoptionStatus,
    getMyAdoptedBins
} = require('../controllers/adoptBinController');

router.post('/adopt', authenticate, adoptBin);

router.get('/adoption-status', authenticate, checkAdoptionStatus);

router.get('/my-adopted-bins', authenticate, getMyAdoptedBins);

module.exports = router;