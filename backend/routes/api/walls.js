const express = require('express')
const { requireAuth } = require('../../utils/auth')
const prisma = require('./prisma')

const router = express.Router()


// GET ALL WALLS - MAYBE PAGINATE ? CAN CLICK OVER TO NEXT PAGE

router.get('/', requireAuth, async (req, res, next) => {
    const user = req.user
    const walls = await prisma.wall.findMany({
        where: {
            userId: user.id
        },
        include: {
            _count: {
                select: { quotes: true },
            }
        }
    })
    try {
        return res.json(walls)
    }
    catch (e) {
        next(e)
    }
})

// GET DETAILS OF SPECIFIC WALLS

router.get('/:id', requireAuth, async (req, res) => {
    const wall = await prisma.wall.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            quotes: {
                select: {
                    content: true,
                    author: true,
                    id: true,
                    color: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                }
            },
            group: {
                select: {
                    id: true,
                    username: true,
                }
            },
            _count: {
                select: { quotes: true },
            }
        }
    })

    return res.json(wall)
})

// CREATE NEW WALL

router.post('/new', requireAuth, async (req, res, next) => {
    const { name, access, quote, color, usersArray } = req.body
    const userId = req.user.id
    let newWall;
    if (!quote) {
        newWall = {
            name,
            userId,
            access,
            color,
            group: {
                connect: usersArray,
            }
        }
    }
    else {
        newWall = {
            name,
            userId,
            access,
            color,
            group: {
                connect: userList,
            },
            quotes: {
                create: {
                    content: quote.content,
                    author: quote.author,
                    userId: req.user.id
                }
            }
        }
    }
    try {
        const wall = await prisma.wall.create({ data: newWall })
        return res.json(wall)
    }
    catch (e) {
        console.error(e)
        return res.json({ Error: e })
    }

})

// UPDATE WALL

router.put('/:id', requireAuth, async (req, res, next) => {
    const id = parseInt(req.params.id)
    const data = req.body
    try {
        const updateWall = await prisma.wall.update({
            where: {
                id,
                userId: req.user.id
            }, data

        })
        return res.status(201).json(updateWall)

    }
    catch (e) {
        console.error(e)
        return res.status(404).json({ Error: "Record not found" })
    }
})

router.delete('/:id', requireAuth, async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        await prisma.wall.delete({
            where: {
                id,
                userId: req.user.id
            }
        })
        return res.json({ Status: "Successfully Deleted" });
    }

    catch (e) {
        console.error(e)
        return res.status(404).json({ Error: "Record not found" })
    }
})

module.exports = router;
