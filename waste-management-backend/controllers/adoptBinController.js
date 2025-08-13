// waste-management-backend/controllers/adoptBinController.js
const { AdoptedBin, User } = require('../models');
const { Op } = require('sequelize'); 

const adoptBin = async (req, res) => {
    try {
        const { location } = req.body;
        const userId = req.user.id; 

        if (!location) {
            return res.status(400).json({ message: 'Location is required to adopt a bin.' });
        }

        const existingAdoption = await AdoptedBin.findOne({
            where: {
                location: {
                    [Op.like]: location 
                }
            }
        });

        if (existingAdoption) {
            return res.status(409).json({ message: 'This bin location is already adopted.' });
        }

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

const checkAdoptionStatus = async (req, res) => {
    try {
        const { location } = req.query; 

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
                attributes: ['fullName', 'email']
            }]
        });

        if (existingAdoption) {
            return res.status(200).json({ isAdopted: true, adoptedBy: existingAdoption.adopter.fullName || existingAdoption.adopter.email });
        } else {
            return res.status(200).json({ isAdopted: false });
        }

    } catch (error) {
        console.error('Error checking adoption status:', error);
        res.status(500).json({ message: 'Error checking adoption status', error: error.message });
    }
};

const getMyAdoptedBins = async (req, res) => {
    try {
        const userId = req.user.id; 

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