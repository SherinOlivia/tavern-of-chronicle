import express from 'express';
import 'dotenv/config';
import appMiddleware from './middleware';

const app = express();
const port = process.env.PORT || 5678;

appMiddleware(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});