import { Request, Response, NextFunction } from "express";
import { errorHandling } from "../utils/errorHandling";
import { CustomError, CustomResponse } from "../types/types";

const errorHandlingMiddleware = (err: CustomError, req: Request, res: CustomResponse, next: NextFunction) => {
    const errorResponse = errorHandling(null, err);

    if ( errorResponse && errorResponse.error) {
        res.status(err.status || 500).json({
            success: false,
            error: errorResponse.error.message
        });
    } else {
        res.status(200).json({
            success: true,
            data: errorResponse ? errorResponse.data : null
        });
    }

};

export default errorHandlingMiddleware