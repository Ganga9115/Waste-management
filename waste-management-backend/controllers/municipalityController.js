const { ReportedBin, User, Vehicle, sequelize } = require("../models");

// Fetch all reported bins
exports.getReports = async (req, res) => {
    try {
        const reports = await ReportedBin.findAll({
            where: { status: ['Pending', 'In Progress'] },
            include: [
                {
                    model: User,
                    as: 'reporter',
                    attributes: ['fullName', 'email']
                },
                {
                    model: Vehicle,
                    as: 'assignedVehicle',
                    attributes: ['licensePlate', 'status']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: "Failed to fetch reports." });
    }
};

// Fetch all vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ message: "Failed to fetch vehicles." });
    }
};

// Assign a vehicle to a reported bin
exports.assignVehicle = async (req, res) => {
    const { reportId, vehicleId } = req.body;
    
    if (!reportId || !vehicleId) {
        return res.status(400).json({ message: "Report ID and Vehicle ID are required." });
    }

    const t = await sequelize.transaction();

    try {
        const report = await ReportedBin.findByPk(reportId, { transaction: t });
        const vehicle = await Vehicle.findByPk(vehicleId, { transaction: t });

        if (!report) {
            await t.rollback();
            return res.status(404).json({ message: "Report not found." });
        }

        if (!vehicle) {
            await t.rollback();
            return res.status(404).json({ message: "Vehicle not found." });
        }

        await report.update({
            status: 'In Progress',
            assignedVehicleId: vehicle.id,
            assignedAt: new Date()
        }, { transaction: t });

        await vehicle.update({ status: 'Assigned' }, { transaction: t });

        await t.commit();
        res.status(200).json({ message: "Vehicle assigned successfully.", report });

    } catch (error) {
        await t.rollback();
        console.error('Error assigning vehicle:', error);
        res.status(500).json({ message: "Failed to assign vehicle." });
    }
};