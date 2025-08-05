// controllers/pickupController.js
const { SpecializedPickup } = require('../models');

exports.requestPickup = async (req, res) => {
    try {
        // ✅ MODIFIED: Get the imageData from the body
        const { wasteType, address, pickupDate, pickupTime, additionalNotes, wasteImageBase64 } = req.body;
        const userId = req.user.id;

        if (!wasteType || !address || !pickupDate || !pickupTime) {
            return res.status(400).json({ message: 'Waste type, address, date, and time are required.' });
        }

        const newPickupRequest = await SpecializedPickup.create({
            wasteType,
            address,
            pickupDate,
            pickupTime,
            additionalNotes,
            // ✅ MODIFIED: Store the Base64 string directly
            imageData: wasteImageBase64,
            userId,
            status: 'Pending',
        });

        return res.status(201).json({
            message: 'Pickup confirmed successfully!',
            request: newPickupRequest,
        });

    } catch (error) {
        console.error('Error requesting pickup:', error);
        return res.status(500).json({ message: 'Server error while requesting pickup.', error: error.message });
    }
};