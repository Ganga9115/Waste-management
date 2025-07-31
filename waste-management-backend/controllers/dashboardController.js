// waste-management-backend/controllers/dashboardController.js
const { User, ReportedBin } = require('../models'); // Import both User and ReportedBin models

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authenticated middleware

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
            order: [['createdAt', 'DESC']], // Newest reports first
            limit: 3, // Only fetch a few for the dashboard preview
            attributes: ['id', 'latitude', 'longitude', 'status', 'createdAt', 'comments', 'priority', 'imagePaths']
            // Note: 'address' is not included here as it's not in your ReportedBin model.
            // If you want an address, you'd need to reverse geocode latitude/longitude on the frontend
            // or add an address field to ReportedBin and populate it during report creation.
        });

        res.status(200).json({
            user: user,
            recentReports: recentReports,
            // You can add data for other sections here if they become dynamic later
            // e.g., collectionSchedule: [],
            // upcomingEvents: [],
            // communityLeaders: [],
            // learnAboutWaste: []
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
    }
};