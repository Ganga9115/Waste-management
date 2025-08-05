// routes/pickupRoutes.js
const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');
const authenticate = require('../middlewares/authMiddleware');

// ✅ MODIFIED: Multer and related code has been removed.
// The route will now receive a JSON payload.

// Route to request a specialized pickup (protected by authentication)
// ✅ MODIFIED: Removed the multer middleware from the route
router.post('/request', authenticate, pickupController.requestPickup);

module.exports = router;