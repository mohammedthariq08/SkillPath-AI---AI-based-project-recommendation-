import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import recRouter from './Routes/RecommendationRouter.mjs';
import regRouter from './Routes/RegisterRouter.mjs';
import cookieParser from 'cookie-parser';


const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL
]

app.use(cors({
    origin: function (origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
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