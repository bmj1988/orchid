const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const wallsRouter = require('./walls.js')
const quotesRouter = require('./quotes.js')
const commentsRouter = require('./comment.js')
const likesRouter = require('./like.js')
//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/walls/', wallsRouter)
router.use('/quotes', quotesRouter)
router.use('/comments', commentsRouter)
router.use('/likes', likesRouter)


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});



module.exports = router;
