import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:false,  
        default: ""     
    },

    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
     createdAt:{ 
        type: Date,
        default: Date.now
     },

},{timestamps:true})

const Todo = mongoose.model('Todo',todoSchema)
export default Todo