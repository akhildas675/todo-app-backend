import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true,

    },


    description:{
        type:String,
        required:true
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


    

},{timestamps:true})



const Todo = mongoose.model('Todo',todoSchema)

export default Todo


