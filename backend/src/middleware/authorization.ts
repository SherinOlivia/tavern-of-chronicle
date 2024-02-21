import { Request, Response, NextFunction } from 'express';
import { CustomResponse } from '../types/types';
import { errorHandling } from '../controller/errorHandling';

const authorizationMiddleware = (roles: string[]) => (req: Request, res: CustomResponse, next: NextFunction) => {
    if (req.role && !roles.includes(req.role)) {
        return res.status(401).json(errorHandling(null, "Unauthorized Access~"));
    } 
    
    next();
};

export default authorizationMiddleware