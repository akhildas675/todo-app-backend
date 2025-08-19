import express from 'express';

import {userRegister,userLogin,getUsers,getUserTasks} from "../controllers/userController.js"

const userRoute =express.Router();


userRoute.post('/register',userRegister)
userRoute.post('/login',userLogin)
userRoute.get('/getUsers',getUsers)
userRoute.get('/myTask',getUserTasks)




export default userRoute