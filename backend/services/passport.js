const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client";

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    prisma.user.findUnique({
        where: {
            id,
        }
    }).then(user => {
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: '/auth/google/callback',
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await prisma.user.findUnique({ where: { id } });
                if (existingUser) {
                    return done(null, existingUser)
                }
                const user = await prisma.user.create({
                    data: {
                        email: profile.email,
                        name: profile.name
                    }
                }).save();
                done(null, user);
            }
            catch (err) {
                done(err, null);
            }
        }
    )
)
