// controllers/binController.js
const { ReportedBin } = require('../models'); 

// ✅ MODIFIED: reportBin function to handle JSON data
exports.reportBin = async (req, res) => {
    try {
        // ✅ MODIFIED: No longer using req.files. Extract imagesData from the JSON body.
        const { latitude, longitude, priority, comments, imagesData } = req.body;

        // Basic validation
        if (!latitude || !longitude || !priority) {
            return res.status(400).json({ message: 'Location (latitude, longitude) and priority are required.' });
        }

        // No need to parse latitude/longitude from strings, as they are sent as numbers in JSON.

        const userId = req.user ? req.user.id : null;

        // ✅ NEW: Convert the imagesData array to a JSON string for database storage
        const imagesDataString = JSON.stringify(imagesData);

        const newReport = await ReportedBin.create({
            // ✅ MODIFIED: Use the new imagesData field and the JSON string
            imagesData: imagesDataString,
            latitude,
            longitude,
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
        // ✅ MODIFIED: Removed file cleanup logic as we are no longer handling files
        res.status(500).json({ message: 'Server error while reporting bin.', error: error.message });
    }
};

// ✅ NEW: A new function to fetch reports specifically for the logged-in user
exports.getMyBinReports = async (req, res) => {
    try {
        const userId = req.user.id;
        const reports = await ReportedBin.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching user bin reports:', error);
        res.status(500).json({ message: 'Server error while fetching user bin reports.', error: error.message });
    }
};

// This function can remain for fetching ALL reports (e.g., for an admin dashboard)
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