// routes/binRoutes.js
const express = require('express');
const router = express.Router();
const binController = require('../controllers/binController');
const authenticate = require('../middlewares/authMiddleware'); 

// ✅ MODIFIED: Removed all imports related to file handling (multer, path, fs)
// ✅ MODIFIED: Removed all multer configuration code

// ✅ MODIFIED: Route for reporting a bin
// The `upload.array` middleware has been removed because we are no longer handling file uploads.
// The data is now sent in the request body as JSON.
router.post('/report', authenticate, binController.reportBin);

// Route to get all bin reports (e.g., for municipal view)
router.get('/reports', authenticate, binController.getAllBinReports); 

// ✅ NEW: Route to get reports specifically for the authenticated user
router.get('/my-reports', authenticate, binController.getMyBinReports);

module.exports = router;