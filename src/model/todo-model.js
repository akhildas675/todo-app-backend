import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,

    },

    isCompleted:{
        type:Boolean,
        required:false
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    

},{timestamps:true})



const Todo = mongoose.model('Todo',todoSchema)

export default Todo


