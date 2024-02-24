import express from 'express'
import { registerUser, loginUser } from '../controller/authentication';

const authRouter = express.Router()

authRouter.get('/register', registerUser);
authRouter.get('/login', loginUser);
// authRouter.post('/logout', logoutUser)
// authRouter.post('/resetpasswordrequest', resetPasswordRequest)
// authRouter.post('/resetpassword', resetPassword)

export default authRouter;