import express from 'express'
import { registerUser, logInUser, logOutUser } from '../controller/authentication';

const authRouter = express.Router()

authRouter.get('/register', registerUser);
authRouter.get('/login', logInUser);
authRouter.post('/logout', logOutUser)
// authRouter.post('/resetpasswordrequest', resetPasswordRequest)
// authRouter.post('/resetpassword', resetPassword)

export default authRouter;