import { Request, Response, NextFunction } from 'express';
import { CustomRequest, CustomResponse } from '../types/custom';
import { errorHandling } from '../controller/errorHandling';

const authorizationMiddleware = (roles: string[]) => (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    if (!roles.includes(req.role)) {
        return res.status(401).json(errorHandling(null, "Unauthorized Access~"));
    } 
    
    next();
};

export default authorizationMiddleware