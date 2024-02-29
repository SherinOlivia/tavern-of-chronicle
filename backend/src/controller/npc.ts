import { Request, Response } from "express";
import { QueryResult } from "pg";
import { errorHandling } from "../controller/errorHandling";
import pool from "../config/database";


const createNPC = async (req: Request, res: Response) => {
    const { npc_name, gender, age, role, affiliation } = req.body
    const affiliationEnums = ["kingdom", "adventure_guild","demon_tribe"]
    const roleEnums = ["merchant","customer"]
    try {
        const checkNPC: QueryResult = await pool.query("SELECT * from npc WHERE npc_name = $1",[npc_name])
        if (checkNPC) {
            res.status(400).json(errorHandling(null,"Name already used, Please provide another name"));
        } else {
            if (!affiliationEnums.includes(affiliation)) {
                return res.status(400).json(errorHandling(null, "Please choose affiliation from these options:"+ affiliationEnums.join(',')));
            } else if (!roleEnums.includes(role)) {
                return res.status(400).json(errorHandling(null, "Please choose role from these options:"+ roleEnums.join(',')));
            } else {
                const newNPC = await pool.query("INSERT INTO npc (name, gender, age, role, affiliation) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [npc_name, gender, age, role, affiliation])

                res.status(200).json(errorHandling({
                    success: true,
                    message: "NPC Created Successfully",
                    data: newNPC},
                    null))
            }
        }
    } catch (error) {
        return res.status(500).json(errorHandling(null, "Internal Error.. Failed to create new NPC"));
    }
}
export { createNPC }
