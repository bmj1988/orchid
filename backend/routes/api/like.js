const express = require('express')
const { requireAuth } = require('../../utils/auth')
const prisma = require('./prisma')
const router = express.Router()

router.post('/:quoteId', requireAuth, async (req, res) => {
    const quoteId = Number(req.params.id)
    const userId = req.user.id
    try {
        await prisma.like.create({
            data: {
                quoteId,
                userId
            }
        })
        let count = await prisma.like.count({ where: { quoteId } })
        res.status(201).json(count)
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record not found" })
    }
})

router.delete('/:quotedId', requireAuth, async (req, res) => {
    const quoteId = Number(req.params.id)
    const userId = req.user.id
    try {
        await prisma.like.delete({
            where: {
                AND: [quoteId, userId]
            }
        })
        let count = await prisma.like.count({ where: { quoteId } })
        res.status(201).json(count)
    }
    catch (e) {
        console.error(e)
        res.status(404).json({ Error: "Record not found" })
    }
})

module.exports = router
