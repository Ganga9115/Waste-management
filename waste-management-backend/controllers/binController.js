// controllers/binController.js
const { ReportedBin } = require('../models'); // Get the ReportedBin model from index.js
const path = require('path');

exports.reportBin = async (req, res) => {
    try {
        // Multer stores uploaded files in req.files (because upload.array is used)
        const imagePaths = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : []; // Ensure forward slashes for URLs

        // req.body contains text fields: latitude, longitude, priority, comments
        const { latitude, longitude, priority, comments } = req.body;

        // Basic validation
        if (!latitude || !longitude || !priority) {
            return res.status(400).json({ message: 'Location (latitude, longitude) and priority are required.' });
        }

        // Convert latitude and longitude to numbers (they come as strings from FormData)
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude values.' });
        }

        // Get userId from the authenticated user.
        // Assuming your `authenticate` middleware attaches user info to `req.user`.
        const userId = req.user ? req.user.id : null; // If `userId` is optional, allow null. If mandatory, remove `null`.

        const newReport = await ReportedBin.create({
            imagePaths: imagePaths,
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            priority,
            comments,
            userId,
            status: 'Pending', // Default status for a new report
        });

        res.status(201).json({
            message: 'Bin reported successfully!',
            report: newReport
        });

    } catch (error) {
        console.error('Error reporting bin:', error);
        // Clean up uploaded files if something goes wrong after upload
        if (req.files) {
            const fs = require('fs');
            req.files.forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error("Failed to delete uploaded file:", file.path, err);
                });
            });
        }
        res.status(500).json({ message: 'Server error while reporting bin.', error: error.message });
    }
};

// Example for fetching reports (optional, but useful for municipality or user history)
exports.getAllBinReports = async (req, res) => {
    try {
        const reports = await ReportedBin.findAll({
            include: { // Include user info if you want to display who reported it
                model: require('../models').User,
                as: 'reporter',
                attributes: ['id', 'email'] // Only fetch necessary user attributes
            },
            order: [['createdAt', 'DESC']] // Order by newest first
        });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching bin reports:', error);
        res.status(500).json({ message: 'Server error while fetching bin reports.', error: error.message });
    }
};

// You can add more controller methods here (e.g., getById, updateStatus, delete)