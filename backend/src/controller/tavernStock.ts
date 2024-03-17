import { QueryResult } from 'pg';
import { Request, Response } from 'express';
import { errorHandling } from '../utils/errorHandling';
import pool from '../config/database';

const createStockItem = async (req: Request, res: Response) => {
    const { category, name, price, qty } = req.body
    const categoryEnums = ["food", "beverage", "misc"]
    try {  
        const itemCheck = await pool.query("SELECT * FROM stocks WHERE name = $1",[name])
        if(itemCheck) {
            res.status(400).json(errorHandling(null, "Item already exist..."))
        }
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

const addStockQty = async (req: Request, res: Response) => {
    const { itemId, increaseAmount } = req.body;

    try {
        const currentQtyResult: QueryResult = await pool.query(
            'SELECT qty FROM stocks WHERE id = $1',
            [itemId]
        );
        
        if (currentQtyResult.rows.length === 0) {
            return res.status(404).json(errorHandling(null, 'Stock item not found'));
        }

        const currentQty = currentQtyResult.rows[0].qty;
        const newQty = currentQty + increaseAmount;

        const result: QueryResult = await pool.query(
            'UPDATE stocks SET qty = $1 WHERE id = $2 RETURNING *',
            [newQty, itemId]
        );

        return res.status(200).json(errorHandling(result.rows[0], null));
    } catch (error) {
        console.error('Error increasing stock quantity:', error);
        return res.status(500).json(errorHandling(null, 'Failed to increase stock quantity'));
    }
};

export { createStockItem, addStockQty };