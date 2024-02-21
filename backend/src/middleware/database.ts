import { Request, Response, NextFunction } from "express";
import pool from "../config/database";

export const databaseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as unknown as Request;
    customReq.db = pool;
    next(); 
}


