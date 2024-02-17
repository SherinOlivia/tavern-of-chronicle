import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { errorHandling } from './errorHandling';
import pool from '../config/database';

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result: QueryResult = await pool.query(
            'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, "player") RETURNING id, username, email, role',
            [username, email, hashedPassword]
        );

        res.status(200).json(errorHandling(result.rows[0], null));
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json(errorHandling(null, 'Internal Server Error.. User Registration Request Failed.'));
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const result: QueryResult = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(404).json(errorHandling(null, 'User not found'));
        }

        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json(errorHandling({ id: user.id, username: user.username, email: user.email },null));
        } else {
            res.status(401).json(errorHandling(null, 'Incorrect password'));
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json(errorHandling(null, 'Failed to login'));
    }
};

export { registerUser, loginUser };
