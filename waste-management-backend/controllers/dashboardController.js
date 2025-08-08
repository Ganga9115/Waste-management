// waste-management-backend/controllers/dashboardController.js
const { User, ReportedBin } = require('../models'); // Import both User and ReportedBin models

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        // Fetch User Profile Data
        const user = await User.findByPk(userId, {
            attributes: [
                'id',
                'fullName',
                'email',
                'ecoPoints',
                'currentLevel',
                'binsAdopted'
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User profile not found.' });
        }

        // Fetch Recent Reported Bins for this user
        const recentReports = await ReportedBin.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            limit: 3, 
            // ✅ MODIFIED: Changed `imagePaths` to `imagesData`
            attributes: ['id', 'latitude', 'longitude', 'status', 'createdAt', 'comments', 'priority', 'imagesData']
        });

        res.status(200).json({
            user: user,
            recentReports: recentReports,
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
    }
};