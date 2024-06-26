const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const { User } = require('../models');
require('dotenv').config();

const JWT_SECRET = process.env.SECRETKEY;

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            const user = await User.findOne({ where: { Email: decoded.Email } });

            if (!user) {
                return res.status(401).json({ error: 'Unauthorized: User not found' });
            }

            if (user.User_type !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admin access required' });
            }
            
            
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.User_type === 'admin') {
        next();
    } else {
        return res.status(403).send({ error: 'Admin access required' });
    }
};

module.exports = {authenticateUser,isAdmin};
