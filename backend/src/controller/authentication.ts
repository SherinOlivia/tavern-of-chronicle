import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { errorHandling } from './errorHandling';
import pool from '../config/database';
import jwt, { Secret } from 'jsonwebtoken';
import validator from 'validator';
import NodeCache from 'node-cache';
import JWT_TOKEN from '../config/jwt';

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        
        if (!validator.isEmail(email)) {
            return res.status(400).json(errorHandling(null, "Invalid email format"));
        }
        
        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1",[username])
        
        if (userCheck.rows[0] > 0) {
            return res.status(400).json(errorHandling(null, "Username already exist.."));
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser: QueryResult = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, "player") RETURNING id, username, email, role',
            [username, email, hashedPassword]
        );

        res.status(200).json(errorHandling({
            message: 'User successfully registered',
            data: newUser.rows[0]}
            , null));
            
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json(errorHandling(null, 'Internal Server Error.. User Registration Request Failed.'));
    }
};

const failedLoginAttemptsCache = new NodeCache({ stdTTL: 600 });
const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, password } = req.body;
        let userData = null;

        const userCheck = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [usernameOrEmail, usernameOrEmail]
        );

        if (userCheck.rows.length > 0) {
            userData = userCheck.rows[0];
        }
        const failedAttempts = failedLoginAttemptsCache.get<number>(usernameOrEmail);

        if (failedAttempts !== undefined && failedAttempts >= 5) {
            return res.status(400).json(errorHandling(null, 'Too many failed login attempts'));
        }
        if (userData) {
            const passwordCheck = await bcrypt.compare(password, userData.password);
    
            if (passwordCheck) {
                let refreshToken = req.cookies.refresh_token;
                if (!refreshToken) {
                    refreshToken = jwt.sign({ id: userData.id, username: userData.username, role: userData.role }, JWT_TOKEN as Secret, { expiresIn: '7d' });
                }
                const accessToken = jwt.sign({ id: userData.id, username: userData.username }, 'secret', { expiresIn: '1h' });
                // Reset limit login
                failedLoginAttemptsCache.del(usernameOrEmail);
                
                // Expiration time for tokens
                const accessTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
                const refreshTokenExpiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

                // Cookies
                res.cookie('access_token', accessToken, {
                    expires: accessTokenExpiration,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });

                res.cookie('refresh_token', refreshToken, {
                    expires: refreshTokenExpiration,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });
    
                return res.status(200).json(errorHandling({
                    message: `${userData.role} ${userData.username} Successfully logged in!`,
                    data: userData,
                    accessToken,
                    accessTokenExpiration,
                    refreshToken,
                    refreshTokenExpiration,}, null)
                );
            } else {
            const newFailedAttempts = (failedAttempts || 0) + 1;
            failedLoginAttemptsCache.set(usernameOrEmail, newFailedAttempts);
            return res.status(400).json(errorHandling(null, 'Incorrect Password or Username/Email'));
            } 
        } else {
            return res.status(400).json(errorHandling(null, 'User not found. Please check your credentials.'));
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json(errorHandling(null, 'Failed to login'));
    }
};

const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.status(200).json(errorHandling("See you next time!", null));
};

export { registerUser, loginUser, logoutUser };
