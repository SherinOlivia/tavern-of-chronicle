import { Request, Response } from "express";
import { QueryResult } from "pg";
import { errorHandling } from "../controller/errorHandling";
import pool from "../config/database";

const viewUserProfile = async (req: Request, res: Response) => {
    const user = req.user
    try {
        if (!user) {
            res.status(400).json(errorHandling(null,"Please login..!"));
        } else {
            const userData = await pool.query("SELECT * from users WHERE id = $1",[user.id])
            return res.status(200).json({
                success: true,
                message: `${user.name}'s Profile:`,
                data: userData 
            });
        }
    } catch (error) {
        return res.status(500).json(errorHandling(null, "Internal Error.. Failed to view User's Profile"));
    }
}

const getUserList = async (req: Request, res: Response) => {
    const user = req.user
    try {
        
        if (!user) {
            res.status(400).json(errorHandling(null,"Please login..!"));
        } else {
            const checkAdminRole = await pool.query("SELECT * from users WHERE role = $1",[user.role])
            if (!checkAdminRole) {
                res.status(400).json(errorHandling(null,"Unauthorized Access..!!!!!"));
            } else {
                const userList = await pool.query("SELECT * from users")
                return res.status(200).json({
                    success: true,
                    message: `List of User Profiles`,
                    data: userList 
                });
            }
        }
    } catch (error) {
        return res.status(500).json(errorHandling(null, "Internal Error.. Failed to view User's Profile"));
    }
}

export { viewUserProfile, getUserList }