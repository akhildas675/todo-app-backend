import express from 'express';

import connectDB from './src/config/connectDB';


const app=express()
const port=process.env.PORT || 4000;

app.use(express.json())

connectDB()


app.get("/",(req,res)=>{
    console.log(`server running successfully`)
})




app.listen(port,()=>{
    console.log(`server running port http://localhost:${port}`)
})




