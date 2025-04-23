import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';



//App config
const app  = express();
const PORT =  4000;

//Middleware
app.use(express.json());
app.use(cors());

//DB config
connectDB();

//API routes
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});

