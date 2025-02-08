
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGOOSE_URI)
.then(() => {
    console.log('Connected to database');
})
.catch((err) => {
    console.log('Connection failed: ', err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})