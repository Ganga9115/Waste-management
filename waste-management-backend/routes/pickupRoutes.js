// routes/pickupRoutes.js
const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');
const authenticate = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, 'pickup-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to request a specialized pickup (protected by authentication)
router.post('/request', authenticate, upload.single('wasteImage'), pickupController.requestPickup);

module.exports = router;