import mongoose from "mongoose";

export const connectDB = async () =>{
     await mongoose.connect('mongodb+srv://admin:admin@cluster0.bvspkn9.mongodb.net/food-delivery').then(()=>console.log('MongoDB connected')).catch((err)=>console.log(err))
}

