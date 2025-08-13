// controllers/binController.js
const { ReportedBin } = require('../models'); 
const path = require('path');

exports.reportBin = async (req, res) => {
    try {
        const imagePaths = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : []; 

        const { latitude, longitude, priority, comments } = req.body;

        if (!latitude || !longitude || !priority) {
            return res.status(400).json({ message: 'Location (latitude, longitude) and priority are required.' });
        }
        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);

        if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude values.' });
        }

        const userId = req.user ? req.user.id : null;

        const newReport = await ReportedBin.create({
            imagePaths: imagePaths,
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            priority,
            comments,
            userId,
            status: 'Pending', 
        });

        res.status(201).json({
            message: 'Bin reported successfully!',
            report: newReport
        });

    } catch (error) {
        console.error('Error reporting bin:', error);
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

exports.getAllBinReports = async (req, res) => {
    try {
        const reports = await ReportedBin.findAll({
            include: { 
                model: require('../models').User,
                as: 'reporter',
                attributes: ['id', 'email'] 
            },
            order: [['createdAt', 'DESC']] 
        });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching bin reports:', error);
        res.status(500).json({ message: 'Server error while fetching bin reports.', error: error.message });
    }
};
