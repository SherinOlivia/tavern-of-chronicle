import { Request, Response, NextFunction } from "express";
import { errorHandling } from "../controller/errorHandling";
import { CustomError, CustomResponse } from "../types/custom";

const errorHandlingMiddleware = (err: CustomError, req: Request, res: CustomResponse, next: NextFunction) => {
    const errorResponse = errorHandling(null,err);

    res.status(err.status || 500).json(errorResponse);

};

export default errorHandlingMiddleware