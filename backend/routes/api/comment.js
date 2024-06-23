const { Router } = require('express')
const { requireAuth } = require('../../utils/auth')
const prisma = require('./prisma')
const router = Router()

router.get('/:quoteId', requireAuth, async (req, res) => {
    const quoteId = Number(req.params.quoteId)
    const page = Number(req.query.page) || 0
    try {
        const comments = prisma.comment.findMany({
            where: {
                quoteId
            },
            skip: page * 10,
            take: 10
        })
        return res.json(comments)
    }
    catch (e) {
        console.error(e)
        return res.status(404).json({ Error: "Resource could not be found" })
    }
})

router.post('/:quoteId', requireAuth, async (req, res) => {
    const quoteId = Number(req.params.quoteId)
    const userId = req.user.id
    const { content } = req.body
    try {
        const comment = await prisma.comment.create({
            data: {
                quoteId,
                userId,
                content
            }
        })
        return res.status(201).json(comment)
    }
    catch (e) {
        console.error(e)
        res.status(401).json({ Error: "Resource not found" })
    }
})

router.put('/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id)
    const userId = req.user.id
    const { content } = req.body
    try {
        const comment = await prisma.comment.update({
            where: {
                AND: [
                    id,
                    userId
                ]
            },
            data: {
                content,
                updatedOn: now(),
            }
        })
        res.json(comment)

    }
    catch (e) {
        console.error(e)
        return res.status(401).json({ Error: "Resource not found" })
    }
})

router.delete('/:id', requireAuth, async (req, res) => {
    const id = Number(req.params.id)
    const userId = req.user.id
    try {
        await prisma.comment.delete({
            where: {
                AND: [
                    id,
                    userId
                ]
            }
        })
        res.json({ Success: true })
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: 'Resource not found' })
    }
})

module.exports = router
