import express from 'express';
import dotenv from 'dotenv';

import connectDB from './db/db';

import userRoutes from './routes/user';
import vendorRoutes from './routes/vendor';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => { res.send('APP IS RUNNING') })

app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})