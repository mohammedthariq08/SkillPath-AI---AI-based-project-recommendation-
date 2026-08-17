import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async(req,res)=>{
    try{
            const {name,email,password} = req.body;
        const exists = await User.findOne({email});
        if(exists){
            return res.status(400).json({message: "User Already Exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword 
            }
        );
        res.status(200).json(user);
    }
    catch(err){
        console.error('Register error')
        console.error(err)
        res.status(500).json({message: 'Internal Server Error',error:err.message});
    }
}
export const Login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const exists = await User.findOne({email});
        if(!exists){
            return res.status(400).json({message: 'User Does Not Exist'});
        }
        const isMatch = await bcrypt.compare(password,exists.password);
        if(!isMatch){
            return res.status(400).json({message: 'Incorrect Password'});
        }
        const token = jwt.sign(
            {id: exists._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });
        res.status(200).json({message: 'Login Successful'});
    }
    catch(err){
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export const Logout = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        })
        res.status(200).json({message: 'Logout Successful'});
    }
    catch(err){
        console.error('REGISTER ERROR',err)
        res.status(500).json({message: 'Internal Server Error', error: err.message});
    }
}