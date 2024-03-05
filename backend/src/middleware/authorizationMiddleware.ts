import { Request, Response, NextFunction } from 'express';
import { errorHandling } from '../controller/errorHandling';

const authorizationMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (req.role && !roles.includes(req.role)) {
        return res.status(401).json(errorHandling(null, "Unauthorized Access~"));
    } 
    
    next();
};

export default authorizationMiddleware