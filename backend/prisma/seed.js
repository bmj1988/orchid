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
            walls: {
                create: {
                    name: 'Demo Wall',
                    quotes: {
                        create: {
                            content: "Man is free at the moment he wishes to be.",
                            author: "Voltaire"

                        }
                    }
                }
            }
        }
    })

    const demo2 = await prisma.user.upsert({
        where: { email: 'demo2@orchid.io' },
        update: {},
        create: {
            email: "demo2@orchid.io",
            name: "Second Demo",
            hashedPassword: bcrypt.hashSync('password'),
            walls: {
                create: {
                    name: 'Inspiration',
                    quotes: {
                        create: {
                            content: "Keep your face always toward the sunshine - and shadows will fall behind you.",
                            author: "Walt Whitman"
                        }
                    }
                }
            }
        }
    })

    const demo3 = await prisma.user.upsert({
        where: { email: 'demo3@orchid.io' },
        update: {},
        create: {
            email: "demo3@orchid.io",
            name: "Third Demo",
            hashedPassword: bcrypt.hashSync('password'),
            walls: {
                create: {
                    name: 'Wisdom',
                    quotes: {
                        create: {
                            content: "Affliction comes to us, not to make us sad but sober; not to make us sorry but wise.",
                            author: "H.G. Wells"
                        }
                    }
                }
            }
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
