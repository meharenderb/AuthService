const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');

const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({
				status: false,
				message: 'Authentication token is required to access this resource.',
				data: {},
			});
		}

		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(token, JWT_KEY);
			req.user = { id: decoded.data.id }; // Store in `req.user`
			next();
		} catch (error) {
			let errorMessage = 'Authentication failed. Please log in again.';
			if (error.name === 'TokenExpiredError') {
				errorMessage = 'Your session has expired. Please log in again.';
			} else if (error.name === 'JsonWebTokenError') {
				errorMessage = 'Invalid authentication token. Please try logging in again.';
			}

			return res.status(401).json({
				status: false,
				message: errorMessage,
				data: {},
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: 'Internal server error.',
			data: {},
		});
	}
};

module.exports = authMiddleware;
