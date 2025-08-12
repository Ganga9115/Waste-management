const municipalityAuth = (req, res, next) => {
    if (req.user && req.user.role === 'municipality') {
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Municipality access only." });
    }
};

module.exports = municipalityAuth;