import mongoose from 'mongoose';
import 'dotenv/config';

export default () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('DB CONNECTED');
        }).catch(error => {
            console.log('ERROR WHILE CONNECTING TO MONGODB:', error.message);
        })
}