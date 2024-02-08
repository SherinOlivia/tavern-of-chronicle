export interface CustomError extends Error {
    status?: number;
}

export interface CustomRequest extends Request {
    role: 'game_master' | 'player' | null;
    user: User;
    db: Pool;
    cookies: Cookies;
}

export interface CustomResponse extends Response {
    json(errorResponse: { sucess: boolean; error: Error; success?: undefined; data?: undefined; } | { success: boolean; data: any; sucess?: undefined; error?: undefined; }): unknown;
    status(code: number): CustomResponse;
}
