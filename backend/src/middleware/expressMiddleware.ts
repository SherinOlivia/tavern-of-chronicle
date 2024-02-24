import express, { Application } from "express";

const expressMiddleware = (app: Application) => {
    app.use(express.json());

};

export default expressMiddleware