import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('APP IS RUNNING');
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})