import express from 'express';

import connectDB from './src/config/connectDB.js';
import cors from 'cors'

import dotenv from "dotenv"
import todoRoute from './src/routes/todoRoutes.js';
import userRoute from './src/routes/userRoutes.js';

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
app.use('/todos',todoRoute)


app.listen(port,()=>{
    console.log(`server running port http://localhost:${port}`)
})




