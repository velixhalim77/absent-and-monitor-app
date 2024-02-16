const jwt = require('jsonwebtoken');
const {jwtDecode} = require("jwt-decode");

// const config = require('../config/config');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({error: 'Token not provided'});
    }
    const decodeToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    let tokenValid = decodeToken.exp >= currentTime;
    if (!tokenValid) {
        return res.status(401).json({error: 'Token expired please login again'});
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Invalid token'});
        }
        req.employeeId = decoded.id;
        next();
    });
}

module.exports = verifyToken;