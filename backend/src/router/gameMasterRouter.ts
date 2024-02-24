import express from 'express'
import { registerGameMaster } from '../config/gameMasterAccount';

const gameMasterRouter = express.Router()

gameMasterRouter.get('/setup', registerGameMaster);

export default gameMasterRouter;