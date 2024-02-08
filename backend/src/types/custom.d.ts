export interface CustomError extends Error {
    status?: number;
}

export interface CustomRequest extends Request {
    role: 'game_master' | 'player';
    user: User;
    db: Pool;
    cookies: Cookies;
}

export interface CustomResponse extends Response {
    json(body?: any): CustomResponse;
    status(code: number): CustomResponse;
}
