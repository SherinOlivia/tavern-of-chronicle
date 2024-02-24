import express, { Request, Response } from 'express';
import authenMiddleware from '../middleware/authenticationMiddleware';
import { authRouter, gameMasterRouter } from '../router';

const router = express.Router();

router.get("/", function (req: Request, res: Response) {
    res.status(200).json({
        success: true,
        message: "Hello, Welcome to Tavern of Chronicle! Come on in!"
    })
})

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/gamemaster', authenMiddleware, gameMasterRouter)
// router.use('/api/v1/user', authenMiddleware, userRouter)


export default router;