import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5678;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});