import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/TodoApp`);
        console.log('Mongodb connected')
    } catch (err) {
        console.error(`Error connecting to mongodb`,err)
    }
};


export default connectDB