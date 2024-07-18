const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const router = express.Router();
const prisma = require('./prisma')


// Log in
router.post('/', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            _count: {
                select: {
                    followedBy: true,
                    following: true
                }
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { email: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        img: user.img,
        username: user.username,
        bio: user.bio,
        access: user.access,
        followedBy: user._count.followedBy,
        following: user._count.following
    };

    await setTokenCookie(res, safeUser);

    return res.json(safeUser);
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});



module.exports = router;
