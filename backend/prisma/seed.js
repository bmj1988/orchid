const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

async function main() {
    const demo = await prisma.user.upsert({
        where: { email: 'demo@orchid.io' },
        update: {},
        create: {
            email: 'demo@orchid.io',
            name: 'demo user',
            hashedPassword: bcrypt.hashSync('password'),
            username: 'demo1',
            img: 'https://heapmobile.s3.amazonaws.com/1714088349605.jpg',
            walls: {
                create: {
                    name: 'Demo Wall',
                }
            }
        }
    })

    await prisma.quote.create({
        data: {
            content: "Man is free at the moment he wishes to be.",
            author: "Voltaire",
            userId: 1,
            wallId: 1
        }
    })

    const demo2 = await prisma.user.upsert({
        where: { email: 'demo2@orchid.io' },
        update: {},
        create: {
            email: "demo2@orchid.io",
            name: "Second Demo",
            username: 'demo2',
            img: 'https://heapmobile.s3.amazonaws.com/1714088349654.jpg',
            hashedPassword: bcrypt.hashSync('password'),
            walls: {
                create: {
                    name: 'Inspiration'
                }
            }
        }
    })

    await prisma.quote.create({
        data: {
            content: "It is never too late to be what you might have been.",
            author: "George Eliot",
            userId: 2,
            wallId: 2
        }
    })

    const demo3 = await prisma.user.upsert({
        where: { email: 'demo3@orchid.io' },
        update: {},
        create: {
            email: "demo3@orchid.io",
            name: "Third Demo",
            username: 'demo3',
            img: 'https://heapmobile.s3.amazonaws.com/1714088349659.jpg',
            hashedPassword: bcrypt.hashSync('password'),
            walls: {
                create: {
                    name: 'Wisdom'
                }
            }
        }
    })


    await prisma.quote.create({
        data: {
            content: "Perfection is not attainable, but if we chase perfection we can catch excellence",
            author: "Vince Lombardi",
            userId: 3,
            wallId: 3
        }
    })

    // END OF SEEDS
    // RAW SQL WITH prisma.$executeRaw``

    console.log({ demo, demo2, demo3 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
