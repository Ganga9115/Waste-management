const express = require('express');
const router = express.Router();
const municipalityController = require('../controllers/municipalityController');
const authenticate = require('../middlewares/authMiddleware');
const municipalityAuth = require('../middlewares/municipalityAuth');

router.get('/reports', authenticate, municipalityAuth, municipalityController.getReports);
router.get('/vehicles', authenticate, municipalityAuth, municipalityController.getVehicles);
router.post('/reports/assign', authenticate, municipalityAuth, municipalityController.assignVehicle);

module.exports = router;