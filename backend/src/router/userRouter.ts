import express from 'express'
import { getUserList, viewUserProfile } from '../controller/user';
import authorizationMiddleware from '../middleware/authorizationMiddleware';

const userRouter = express.Router()

userRouter.get('/profile', viewUserProfile);
userRouter.get('/list', authorizationMiddleware(['game_master']), getUserList);

export default userRouter;