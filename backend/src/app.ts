import express from 'express';
import 'dotenv/config';
import appMiddleware from './middleware';
import router from './router/mainRouter';

const app = express();
const port = process.env.PORT || 5678;

appMiddleware(app)
app.use(router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});