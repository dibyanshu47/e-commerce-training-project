import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

import connectDB from './db/db';

dotenv.config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('APP IS RUNNING');
})

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})