import { Application } from "express";
import cookieMiddleware from "./cookiesMiddleware";
import expressMiddleware from "./expressMiddleware";
import { databaseMiddleware } from "./databaseMiddleware";


const appMiddleware = (app: Application) => {
    app.use(databaseMiddleware);
    cookieMiddleware(app);
    expressMiddleware(app);
};

export default appMiddleware;