// routes/pickupRoutes.js
const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/request', authenticate, pickupController.requestPickup);

module.exports = router;