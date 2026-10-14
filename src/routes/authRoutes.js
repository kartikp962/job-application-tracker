import express from 'express';

const authRouter = express.Router();

authRouter.get('/login', (req, res, next) => {
    return res.json({
        message: 'user is logged in!!'
    })
})

export default authRouter;