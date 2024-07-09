const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const router = express.Router();
const prisma = require('./prisma')


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
            username: user.username,
            img: user.img
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

router.get('/friends', async (req, res, next) => {
    try {
        const friends = await prisma.user.findMany({
            where: {
                followedBy: {
                    some: {
                        followingId: req.user.id
                    }
                },
                following: {
                    some: {
                        followedById: req.user.id
                    }
                }
            },
            select: {
                username: true,
                id: true,
            }
        })
        res.json(friends)
    }
    catch (e) {
        console.error(e)
    }
})

router.get('/followers', async (req, res) => {
    console.log(req.user.id)
    try {
        const user = await prisma.user.findMany({
            where: {
                following: {
                    some: {
                        followedById: req.user.id
                    }
                }
            }
        })
        res.json(user)
    }
    catch (e) {
        console.error(e)
        res.json({ Succss: false })
    }
})

router.post('/follow/:id', async (req, res, next) => {
    const followId = Number(req.params.id)
    try {
        await prisma.follows.create({
            data: {
                followingId: followId,
                followedById: req.user.id
            }
        })
        res.status(201).json({ Success: true })
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record not found" })
    }
})

router.delete('/unfollow/:id', async (req, res, next) => {
    const unfollow = Number(req.params.id)
    try {

        await prisma.follows.delete({
            where: {
                followingId_followedById: {
                    followedById: req.user.id,
                    followingId: unfollow
                }
            }
        })
        res.status(200).json({ Success: true })
    }
    catch (e) {
        res.status(404).json({ Error: "Record not found" })
    }
})

module.exports = router;
