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

app.use('/auth',regRouter);
app.use('/recommend',recRouter);

app.get('/test', (req,res)=>{
    res.json({message:'Backend is working'});
})

app.get('/test-db', async(req,res)=>{
    try{
        const result = await mongoose.connection.db
        .admin()
        .ping();
    res.json({
        message: 'MongoDB is working',
        result
    })
    }
    catch(err){
        console.error('TEST DB ERROR', err);
        res.status(500).json({
            message:"MongoDB failed",
            error: err.message 
        })
    }
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('DB Connected');
    app.listen(process.env.PORT, ()=>{
        console.log(`server running on ${process.env.PORT}`)

    })
})
.catch((err)=>{console.error("MomgoDB error");
    console.error(err);
});
