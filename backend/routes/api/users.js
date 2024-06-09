const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Sign up
router.post('/', async (req, res) => {

    const { email, password, name } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await prisma.user.create({ data: { email, name, hashedPassword } });

    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});


module.exports = router;
