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
        img: user.img,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        safeUser
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
            img: user.img,
            access: user.access,
            bio: user.bio,
            followers: user._count.followers,
            following: user._count.following
        };
        return res.json(
            safeUser
        );
    } else return res.json({ user: null });
});

router.get('/friends', async (req, res, next) => {
    try {
        const friends = await prisma.user.findMany({
            where: {
                followers: {
                    some: {
                        followingId: req.user.id
                    }
                },
                following: {
                    some: {
                        followerId: req.user.id
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
                        followerId: req.user.id
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
                followerId: req.user.id
            }
        })
        res.status(201).json({ Success: true })
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record not found" })
    }
})

router.put('/', async (req, res, next) => {
    const { bio, access } = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                bio,
                access
            },
            select: {
                id: true,
                email: true,
                name: true,
                img: true,
                username: true,
                bio: true,
                access: true
            }
        })
        return res.json(updatedUser)
    }
    catch (e) {
        console.error(e)
        return res.json(e)
    }
})

router.delete('/unfollow/:id', async (req, res, next) => {
    const unfollow = Number(req.params.id)
    try {

        await prisma.follows.delete({
            where: {
                followingId_followerId: {
                    followerId: req.user.id,
                    followingId: unfollow
                }
            }
        })
        return res.status(200).json({ Success: true })
    }
    catch (e) {
        return res.status(404).json({ Error: "Record not found" })
    }
})

router.get('/:id', async (req, res, next) => {
    const id = Number(req.params.id)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                username: true,
                bio: true,
                img: true,
                id: true,
                followers: {
                    select: {
                        followingId: true,
                    }
                },
                _count: {
                    select: {
                        following: true
                    }
                },
                walls: {
                    where: {
                        OR: [
                            {
                                access: "public"
                            },
                            {
                                group: {
                                    some: {
                                        id: req.user.id
                                    }
                                }
                            }
                        ]
                    }
                }
            },
        })
        return res.json(user)
    }
    catch (e) {
        console.error(e)
        return res.status(404).json({ Error: "User not found" })
    }
})

module.exports = router;
