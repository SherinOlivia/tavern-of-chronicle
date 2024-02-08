import { Application } from "express";
import cookieMiddleware from "./cookies";
import expressMiddleware from "./express";
import { databaseMiddleware } from "./database";


const appMiddleware = (app: Application) => {
    app.use(databaseMiddleware);
    cookieMiddleware(app);
    expressMiddleware(app);
};

export default appMiddleware;