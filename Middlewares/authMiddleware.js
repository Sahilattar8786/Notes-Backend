const jwt = require('jsonwebtoken');
const User= require('../Model/userModel');
const asyncHandler = require('express-async-handler');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ error: "Not Authorized, Token Failed" });
        }
    } else {
        res.status(401).json({ error: "Not Authorized, No Token Provided" });
    }
}

module.exports = { protect };
