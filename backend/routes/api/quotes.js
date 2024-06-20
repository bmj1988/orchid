const express = require('express')
const { requireAuth } = require('../../utils/auth')
const prisma = require('./prisma')
const router = express.Router()

// QUOTE FEED

router.get('/feed', async (req, res, next) => {
    try {
        const feed = await prisma.quote.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })
        res.json(feed)
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Records not found" })
    }
})

// GET SINGLE QUOTE - Useful for Quote spotlight

router.get('/:id', async (req, res, next) => {
    const id = Number(req.params.id)
    try {
        const quote = await prisma.quote.findUnique({ where: { id } })
        res.json(quote)
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record not found" })
    }
})

// ADD QUOTE TO WALL / POST QUOTE

router.post('/', requireAuth, async (req, res, next) => {
    const { wallId, content, author } = req.body
    try {
        await prisma.wall.update({
            where: { id: parseInt(wallId), userId: req.user.id },
            data: {
                quotes: {
                    create: {
                        content,
                        author
                    }
                }
            }
        })
        const wall = await prisma.wall.findUnique({
            where: { id: wallId },
            include: {
                quotes: {
                    select: {
                        content: true,
                        author: true,
                        id: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                _count: {
                    select: { quotes: true },
                }
            }
        })
        return res.json(wall)
    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({ Error: "Record couldn't be located" })
    }
})

// UPDATE QUOTE

router.put('/:id', requireAuth, async (req, res, next) => {

    try {
        const updatedQuote = await prisma.quote.update({
            where: {
                id: parseInt(req.params.id), wall: {
                    userId: req.user.id
                }
            }
        })
        return res.status(201).json(updatedQuote)
    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({ Error: "Record couldn't be located" })
    }
})

// DELETE QUOTE

router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        await prisma.quote.delete({
            where: {
                id: Number(req.params.id),
                wall: {
                    userId: req.user.id
                }

            }
        })
        return res.json({ Status: "Successfully deleted" })
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record couldn't be located" })
    }
})

module.exports = router;
