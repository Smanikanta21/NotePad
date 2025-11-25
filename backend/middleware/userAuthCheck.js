require('dotenv').config();
const jwt = require('jsonwebtoken')
const User = require('../models/User');

/*
  Middleware behavior:
  - Accepts access token from `Authorization: Bearer <token>` header OR `accessToken` cookie.
  - If access token is valid -> attach user to req and call next().
  - If access token expired and a valid refresh token cookie exists -> issue new access token cookie, attach user and continue.
  - Otherwise return 401.
*/
const userAuthCheck = async(req,res,next) =>{
    const authHeader = req.headers.authorization;
    let accessToken = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
        accessToken = req.cookies.accessToken;
    }

    const refreshToken = req.cookies && req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({message: 'Unauthorized access - no tokens'});
    }

    try {
        if (accessToken) {
            const userdata = jwt.verify(accessToken, process.env.JWT_SECRET);
            const ouruser = await User.findById(userdata._id);
            if (!ouruser) return res.status(401).json({message: 'Unauthorized access - user not found'});
            req.user = { _id: ouruser._id, name: ouruser.name, email: ouruser.email };
            return next();
        }
    } catch (err) {
        // If token expired, we'll try refresh below. For other errors, reject immediately.
        if (err.name !== 'TokenExpiredError') {
            console.error('Auth check error:', err.message);
            return res.status(401).json({message: 'Unauthorized - ' + err.message});
        }
    }

    // accessToken absent or expired => try refreshToken
    if (!refreshToken) {
        return res.status(401).json({message: 'Unauthorized - no refresh token'});
    }

    try {
        const refreshData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET);
        const ouruser = await User.findById(refreshData._id);
        if (!ouruser) return res.status(401).json({message: 'Unauthorized access - user not found'});

        // issue new access token
        const newAccessToken = jwt.sign({ _id: ouruser._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // set access token cookie for convenience
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000,
            path: '/',
        };
        res.cookie('accessToken', newAccessToken, cookieOptions);

        req.user = { _id: ouruser._id, name: ouruser.name, email: ouruser.email };
        return next();
    } catch (error) {
        console.error('Auth check error:', error.message);
        return res.status(401).json({message: 'Unauthorized - ' + error.message});
    }
}

module.exports = userAuthCheck;