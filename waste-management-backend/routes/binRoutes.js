// routes/binRoutes.js
const express = require('express');
const router = express.Router();
const binController = require('../controllers/binController');
const authenticate = require('../middlewares/authMiddleware'); // Your authentication middleware
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js built-in for file system operations

// Configure Multer for image storage
const uploadDir = path.join(__dirname, '../uploads');
// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true }); // `recursive: true` ensures parent dirs are also created
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files in the 'uploads/' folder
    },
    filename: function (req, file, cb) {
        // Use a unique name for the file to prevent overwrites
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, gif) are allowed!'));
    }
});

// Route for reporting a bin (Protected: requires authentication, handles multiple image uploads)
router.post('/report', authenticate, upload.array('images', 5), binController.reportBin);
// 'images' in upload.array('images', 5) must match the formData.append('images', file) in your frontend.
// The '5' is the max number of files.

// Route to get all bin reports (e.g., for municipal view, or user's own reports)
router.get('/reports', authenticate, binController.getAllBinReports); // Add this for fetching reports

module.exports = router;