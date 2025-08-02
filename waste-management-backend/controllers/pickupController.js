// controllers/pickupController.js
const { SpecializedPickup } = require('../models');

exports.requestPickup = async (req, res) => {
    try {
        const { wasteType, address, pickupDate, pickupTime, additionalNotes } = req.body;
        const userId = req.user.id; // Assuming auth middleware attaches user info
        
        const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;
        
        if (!wasteType || !address || !pickupDate || !pickupTime) {
            return res.status(400).json({ message: 'Waste type, address, date, and time are required.' });
        }

        const newPickupRequest = await SpecializedPickup.create({
            wasteType,
            address,
            pickupDate,
            pickupTime,
            additionalNotes,
            imagePath,
            userId,
            status: 'Pending',
        });

        return res.status(201).json({
            message: 'Pickup confirmed successfully!',
            request: newPickupRequest,
        });

    } catch (error) {
        console.error('Error requesting pickup:', error);
        // If an image was uploaded but something failed, delete it
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Failed to delete uploaded file:", req.file.path, err);
            });
        }
        return res.status(500).json({ message: 'Server error while requesting pickup.', error: error.message });
    }
};