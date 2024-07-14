const express = require('express')
const { requireAuth } = require('../../utils/auth')
const prisma = require('./prisma')
const router = express.Router()

// QUOTE FEED

router.get('/feed', async (req, res, next) => {
    try {
        const feed = await prisma.quote.findMany({
            orderBy: {
                postedOn: 'desc'
            },
            include: {
                user: {
                    select: {
                        username: true,
                    }
                },
                likes: {
                    select: {
                        userId: true,
                    }
                },
                comments: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        },
                        content: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }

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
    try {
        let quote = await prisma.quote.create({
            data: {
                userId: req.user.id,
                ...req.body
            }
        })
        return res.json(quote)
    }
    catch (e) {
        console.log(e.message)
        res.status(404).json({ Error: "Record couldn't be located" })
    }
})

// UPDATE QUOTE

router.put('/:id', requireAuth, async (req, res, next) => {

    try {
        const quote = await prisma.quote.update({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.id
            },
            data: {
                ...req.body
            }
        })

        return res.status(201).json(quote)
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
                userId: req.user.id

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
