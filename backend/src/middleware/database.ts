import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/custom";
import pool from "../config/database";

export const databaseMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    req.db = pool;
    next(); 
}