import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import recRouter from './Routes/RecommendationRouter.mjs';
import regRouter from './Routes/RegisterRouter.mjs';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB Connected'))
.catch((err)=>console.log(err.message));

app.use('/auth',regRouter);
app.use('/recommend',recRouter);

app.listen(process.env.PORT, ()=>console.log(`App is listening in Port ${process.env.PORT}`)); 