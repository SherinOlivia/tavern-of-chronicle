import express from 'express'
import { viewUserProfile } from '../controller/user';

const userRouter = express.Router()

userRouter.get('/profile', viewUserProfile);

export default userRouter;