const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// GET ALL WALLS - MAYBE PAGINATE ? CAN CLICK OVER TO NEXT PAGE

router.get('/', async (req, res, next) => {
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
        res.json(walls)
    }
    catch (e) {
        next(e)
    }
})

// GET DETAILS OF SPECIFIC WALLS

router.get('/:id', async (req, res) => {
    const wall = await prisma.wall.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            quotes: {
                select: {
                    content: true,
                    author: true
                }
            },
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })

    res.json(wall)
})

// CREATE NEW WALL

router.post('/new', async (req, res, next) => {
    const { name, quote } = req.body
    const userId = parseInt(req.user.id)
    let newWall;
    if (!quote) {
        newWall = {
            name,
            userId,
        }
    }
    else {
        newWall = {
            name,
            userId,
            quotes: {
                create: {
                    content: quote.content,
                    author: quote.author,
                }
            }
        }
    }
    try {
        const wall = await prisma.wall.create({data: newWall})
        res.json(wall)
    }
    catch (e) {
        console.error(e)
        res.json({ Error: e })
    }

})

// UPDATE WALL

router.put('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const data = req.body
    try {
        const updateWall = await prisma.wall.update({
            where: {
                id
            }, data

        })
        res.status(201).json(updateWall)
    }
    catch (e) {
        console.error(e)
        next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const deletedWall = await prisma.wall.delete({
            where: {
                id
            }
        })
        res.json({Status: "Successfully Deleted"})
    }
    catch (e) {
        console.error(e)
        next(e)
    }
})

module.exports = router;
