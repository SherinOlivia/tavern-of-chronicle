import { Request, Response } from "express";
import { QueryResult } from "pg";
import { errorHandling } from "../controller/errorHandling";
import pool from "../config/database";

const createPlayerAccount = async (req: Request, res: Response) => {
    try {
        const { name, tavernName, gender, birthday } = req.body;
        const userId = req.user?.id; // Assuming user ID is available in req.user

        // Check if the user already has a player account
        const playerResult: QueryResult = await pool.query(
            "SELECT * FROM players WHERE user_id = $1",
            [userId]
        );

        if (playerResult.rows.length > 0) {
            return res.status(400).json(errorHandling(null, "Player account already exists"));
        }

        // If no player account exists, create a new one
        const insertResult: QueryResult = await pool.query(
            `
            INSERT INTO players (user_id, name, tavern_name, gender, birthday)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [userId, name, tavernName, gender, birthday]
        );

        return res.status(200).json({
            success: true,
            message: "Player account created successfully",
            data: insertResult.rows[0] // Return the newly created player account data
        });
    } catch (error) {
        console.error('Error creating player account:', error);
        return res.status(500).json(errorHandling(null, "Failed to create player account"));
    }
};

export default createPlayerAccount;
