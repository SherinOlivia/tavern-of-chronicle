import { Request, Response } from "express";
import { QueryResult } from "pg";
import { errorHandling } from "../controller/errorHandling";
import pool from "../config/database";

const createPlayerAccount = async (req: Request, res: Response) => {
    try {
        const { name, tavernName, gender, birthday } = req.body;
        const genderEnums = ["male", "female", "nonbinary", "prefer not to say"]
        const userId = req.user?.id;

        if (!genderEnums.includes(gender)) {
            return res.status(400).json(errorHandling(null, "Please choose genders accordingly:"+ genderEnums.join(',')));
        }

        const checkPlayerAccount: QueryResult = await pool.query(
            "SELECT * FROM players WHERE user_id = $1",
            [userId]
        );

        if (checkPlayerAccount.rows.length > 0) {
            return res.status(400).json(errorHandling(null, "Player account already exists"));
        }

        const initialExperience = 0

        const createPlayerAccount: QueryResult = await pool.query(
            `
            INSERT INTO players (user_id, name, tavern_name, gender, birthday, level, experience)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [userId, name, tavernName, gender, birthday, "1", initialExperience]
        );

        return res.status(200).json({
            success: true,
            message: "Player account created successfully",
            data: createPlayerAccount.rows[0] 
        });
    } catch (error) {
        console.error('Error creating player account:', error);
        return res.status(500).json(errorHandling(null, "Internal Error.. Failed to create player account"));
    }
};

const viewPlayerProfile = async (req: Request, res: Response) => {
    const user = req.user
    try {
        if (!user) {
            res.status(400).json(errorHandling(null,"Please login..!"));
        } else {
            const userData = await pool.query("SELECT * from players WHERE user_id = $1",[user.id])
            const playerName = userData.rows[0].name
            return res.status(200).json({
                success: true,
                message: `${playerName}'s Profile`,
                data: userData 
            });
        }
    } catch (error) {
        return res.status(500).json(errorHandling(null, "Internal Error.. Failed to view Profile"));
    }
}

export { createPlayerAccount, viewPlayerProfile };
