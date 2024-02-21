import { Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import JWT_TOKEN from "../config/jwt";
import { errorHandling } from "../controller/errorHandling";

const authenticationMiddleware = (req: any, res: Response, next: NextFunction) => {
    const authentication = req.cookies.access_token;

    if (!authentication) {
        return res.status(400).json(errorHandling(null, "Unauthorized Access.."));
    }  else {
        try {
            const decodedToken = jwt.verify(authentication, JWT_TOKEN as Secret) as JwtPayload;
            console.log("Decoded Token: ", decodedToken);
            if ('role' in decodedToken) {
                req.user = decodedToken;
                req.role = decodedToken.role;
                next();
            } else {
                return res.status(401).json(errorHandling(null, "Unidentified Role..."));
            }

        } catch (error) {
            return res.status(500).json(errorHandling(null, "Invalid Request..!"));
        }
    }
}

export default authenticationMiddleware