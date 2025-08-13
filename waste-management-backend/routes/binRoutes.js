// routes/binRoutes.js
const express = require('express');
const router = express.Router();
const binController = require('../controllers/binController');
const authenticate = require('../middlewares/authMiddleware'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true }); 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
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

router.post('/report', authenticate, upload.array('images', 5), binController.reportBin);

router.get('/reports', authenticate, binController.getAllBinReports); 

module.exports = router;