import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/user';
import vendorRoutes from './routes/vendor';
import customerRoutes from './routes/customer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('APP IS RUNNING') })

app.use('/user', userRoutes);
app.use('/vendor', vendorRoutes);
app.use('/customer', customerRoutes);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB CONNECTED');
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        })
    }).catch(error => {
        console.log('ERROR WHILE CONNECTING TO MONGODB:', error.message);
    })