import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

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

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ 
        success: false,
        message: message,
        statusCode: statusCode
    });
});
