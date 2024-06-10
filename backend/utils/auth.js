const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const prisma = require('../routes/api/prisma')


const { secret } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    };
    const token = jwt.sign(
        { data: safeUser },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: process.env.JWT_EXPIRES_IN * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await prisma.user.findUnique({
                where: {
                    id
                }
            });
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
}

const validateLogin = function (req, res, next) {
    const { email, password } = req.body
    errors = {}
    if (email.length < 1) {
        errors['emailLength'] = 'Enter a valid email'
    }
    if (password.length < 1) {
        errors['password'] = 'Please provide a password'
    }
    if (Object.values(errors).length) return res.status(400).json(errors)
    else return next()
}

module.exports = { setTokenCookie, restoreUser, requireAuth, validateLogin };
