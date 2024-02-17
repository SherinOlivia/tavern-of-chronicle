import { Pool, QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { errorHandling } from './errorHandling';
import pool from '../config/database';

const createStockItem = async (req: Request, res: Response) => {
    const { category, name, price, qty } = req.body
    const categoryEnums = ["food", "beverage", "misc"]
    try {  
        if ( !categoryEnums.includes(category) ) {
            res.status(404).json(errorHandling(null, "Invalid Category. Please assign from available category..:" + categoryEnums.join(",") ))
        } else {
            const result: QueryResult = await pool.query(
                "INSERT into stocks (category, name, price, qty) VALUES ($1, $2, $3, $4) RETURNING id, category, name, price, qty",
                [category, name, price, qty])
    
                res.status(200).json(errorHandling(result.rows[0],null))
        }
    } catch (error) {
        res.status(500).json(errorHandling(null, "Internal Server Error.. Stock Creation Request Failed."))
    }
}