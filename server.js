import express from 'express';

import connectDB from './src/config/connectDB.js';
import cors from 'cors'
import userRoute from './src/routes/userRoutes.js';

import dotenv from "dotenv"

const app=express()
const port=process.env.PORT || 4000;

app.use(express.json())

dotenv.config()


connectDB()


app.get("/",(req,res)=>{
    console.log(`server running successfully`)
})

app.use(cors())

app.use('/users',userRoute)
// app.use('/todo',todoRoute)


app.listen(port,()=>{
    console.log(`server running port http://localhost:${port}`)
})




