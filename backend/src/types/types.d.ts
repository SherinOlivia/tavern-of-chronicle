import { Pool } from "pg";

export interface CustomError extends Error {
    status?: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string;
                role: string;
            };
            role?: string;
            db?: Pool;
        }
    }
}   
    

export interface CustomResponse extends Response {
    json(body?: any): CustomResponse;
    status(code: number): CustomResponse;
}
