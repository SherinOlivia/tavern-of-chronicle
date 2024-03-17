import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { errorHandling } from '../utils/errorHandling';
import pool from '../config/database';

const registerGameMaster = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const checkAccount: QueryResult = await pool.query('SELECT * FROM users WHERE role = "game_master"');

        if (checkAccount.rows.length === 1) {
            return res.status(400).json(errorHandling(null, 'Game Master already exist'));
        } else {   
            const result: QueryResult = await pool.query(
                'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, "game_master") RETURNING id, username, email, role',
                [username, email, hashedPassword]);
    
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error registering Game Master:', error);
        res.status(500).json(errorHandling(null, 'Failed to register Game Master'));
    }
};

export { registerGameMaster };
