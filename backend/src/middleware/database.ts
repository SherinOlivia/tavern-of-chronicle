import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types/custom";
import pool from "../config/database";

export const databaseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const customReq = req as unknown as CustomRequest;
    customReq.db = pool;
    next(); 
}


