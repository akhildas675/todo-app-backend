import User from "../model/user-model.js"


import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken"

import dotenv from "dotenv";



dotenv.config()




const userRegister = async (req,res)=>{
    try {

        console.log('req.body',req.body)

        const {username,email,password}=req.body;

        const existUser=await User.findOne({email})

        console.log('user data',existUser)

        if(existUser){
            return res.status(401).json({msg:"user already exists"})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({name:username,email,password:hashedPassword})
        await newUser.save()

        console.log('user data saved')
        
    } catch (error) {
        
    }
}



const userLogin =async (req,res)=>{
   try {

     const {email,password}=req.body;


    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({msg:'User not found'})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
    res.json({
        token,
        user:{id:user._id,name:user.name,email:user.email}
    })

    console.log('Login success')
    
   } catch (error) {
    res.status(500).json({msg:error.message})
   }



};


export {userRegister,userLogin}