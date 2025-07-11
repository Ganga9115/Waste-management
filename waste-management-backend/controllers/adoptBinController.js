// waste-management-backend/controllers/adoptBinController.js
const { AdoptedBin, User } = require('../models');
const { Op } = require('sequelize'); // For potentially filtering by location string

// Controller to adopt a bin
const adoptBin = async (req, res) => {
    try {
        const { location } = req.body;
        const userId = req.user.id; // User ID from authenticated middleware

        if (!location) {
            return res.status(400).json({ message: 'Location is required to adopt a bin.' });
        }

        // Check if a bin at this location is already adopted
        const existingAdoption = await AdoptedBin.findOne({
            where: {
                location: {
                    [Op.like]: location // Use Op.like for case-insensitive or partial match if needed, or Op.eq for exact match
                }
            }
        });

        // Correction for the typo: existingAdition -> existingAdoption
        if (existingAdoption) {
            return res.status(409).json({ message: 'This bin location is already adopted.' });
        }

        // Create new adoption record
        const newAdoptedBin = await AdoptedBin.create({
            userId,
            location,
            adoptionDate: new Date()
        });

        res.status(201).json({ message: 'Bin adopted successfully!', adoptedBin: newAdoptedBin });

    } catch (error) {
        console.error('Error adopting bin:', error);
        res.status(500).json({ message: 'Error adopting bin', error: error.message });
    }
};

// Controller to check adoption status for a given location
const checkAdoptionStatus = async (req, res) => {
    try {
        const { location } = req.query; // Use req.query for GET parameters

        if (!location) {
            return res.status(400).json({ message: 'Location is required to check status.' });
        }

        const existingAdoption = await AdoptedBin.findOne({
            where: {
                location: {
                    [Op.like]: location
                }
            },
            include: [{
                model: User,
                as: 'adopter',
                // --- FIX: Changed 'username' to 'fullName' to match your User.js model ---
                attributes: ['fullName', 'email']
            }]
        });

        if (existingAdoption) {
            // --- FIX: Accessing existingAdoption.adopter.fullName instead of .username ---
            return res.status(200).json({ isAdopted: true, adoptedBy: existingAdoption.adopter.fullName || existingAdoption.adopter.email });
        } else {
            return res.status(200).json({ isAdopted: false });
        }

    } catch (error) {
        console.error('Error checking adoption status:', error);
        res.status(500).json({ message: 'Error checking adoption status', error: error.message });
    }
};

// Controller to get bins adopted by the current user
const getMyAdoptedBins = async (req, res) => {
    try {
        const userId = req.user.id; // User ID from authenticated middleware

        const myAdoptedBins = await AdoptedBin.findAll({
            where: { userId },
            order: [['adoptionDate', 'DESC']]
        });

        res.status(200).json(myAdoptedBins);

    } catch (error) {
        console.error('Error fetching my adopted bins:', error);
        res.status(500).json({ message: 'Error fetching adopted bins', error: error.message });
    }
};

module.exports = {
    adoptBin,
    checkAdoptionStatus,
    getMyAdoptedBins
};