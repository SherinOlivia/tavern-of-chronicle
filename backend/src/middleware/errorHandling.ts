import { Request, Response, NextFunction } from "express";
import { errorHandling } from "../controller/errorHandling";
import { CustomError, CustomResponse } from "../types/custom";

const errorHandlingMiddleware = (err: CustomError, req: Request, res: CustomResponse, next: NextFunction) => {
    const errorResponse = errorHandling(null, err);

    if (errorResponse.error) {
        res.status(err.status || 500).json({
            success: false,
            error: errorResponse.error.message
        });
    } else {
        res.status(200).json({
            success: true,
            data: errorResponse.data
        });
    }

};

export default errorHandlingMiddleware