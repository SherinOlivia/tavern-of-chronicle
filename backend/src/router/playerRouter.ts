import express from 'express'
import { createPlayerAccount, viewPlayerProfile } from '../controller/player';

const playerRouter = express.Router()

playerRouter.get('/new', createPlayerAccount);
playerRouter.get('/profile', viewPlayerProfile);

export default playerRouter;