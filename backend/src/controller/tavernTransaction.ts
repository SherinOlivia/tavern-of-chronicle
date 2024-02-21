import { QueryResult } from "pg";
import { Request, Response } from "express";
import { errorHandling } from "./errorHandling";
import pool from "../config/database";

const createPlayerBuy = async (req: Request, res: Response) => {
    const { name, qty } = req.body;
    const user = req.user;

    try {
        const itemCheck: QueryResult = await pool.query(
            "SELECT * FROM stocks WHERE name = $1",
            [name]
        );
        if (itemCheck.rows.length === 0) {
            return res.status(404).json(errorHandling(null, "Item doesn't exist..!"));
        }

        const qtyCheck = itemCheck.rows[0].qty;
        if (qty > qtyCheck) {
            return res.status(400).json(errorHandling(null, "Not enough item for sale.."));
        }

        const newQty = qtyCheck - qty;
        await pool.query('UPDATE stocks SET qty = $1 WHERE name = $2 RETURNING *', [newQty, name]);

        const totalPrice = qty * itemCheck.rows[0].price;
        const successfulBuy = await pool.query(
            "INSERT into transactions (category, buyer, seller, item, price, totalPrice, qty, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [itemCheck.rows[0].category, user?.name, itemCheck.rows[0].seller, name, itemCheck.rows[0].price, totalPrice, qty, new Date()]
        );

        res.status(200).json(errorHandling({
            message:"Transaction Successful..!! Here is your purchase: ",
            data: successfulBuy}
             , null)
        );
    } catch (error) {
        res.status(500).json(errorHandling(null, "Internal Server Error.. Transaction Request Failed."));
    }
};

const createPlayerSell = async (req: Request, res: Response) => {
    const { name, qty } = req.body;
    const user = req.user;

    try {
        const itemCheck: QueryResult = await pool.query(
            "SELECT * FROM stocks WHERE name = $1",
            [name]
        );
        if (itemCheck.rows.length === 0) {
            return res.status(404).json(errorHandling(null, "Item doesn't exist..!"));
        }

        const qtyCheck = itemCheck.rows[0].qty;
        if (qty > qtyCheck) {
            return res.status(400).json(errorHandling(null, "Not enough item for sale.."));
        }

        const newQty = qtyCheck - qty;
        await pool.query('UPDATE stocks SET qty = $1 WHERE name = $2 RETURNING *', [newQty, name]);

        const totalPrice = qty * itemCheck.rows[0].price;
        const successfulBuy = await pool.query(
            "INSERT into transactions (category, buyer, seller, item, price, totalPrice, qty, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [itemCheck.rows[0].category, user?.name, itemCheck.rows[0].seller, name, itemCheck.rows[0].price, totalPrice, qty, new Date()]
        );

        res.status(200).json(errorHandling({
            message:"Transaction Successful..!! Here is your purchase: ",
            data: successfulBuy}
             , null)
        );
    } catch (error) {
        res.status(500).json(errorHandling(null, "Internal Server Error.. Transaction Request Failed."));
    }
};


export { createPlayerBuy };
