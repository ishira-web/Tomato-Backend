import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';    // Middleware for file upload

const foodRouter = express.Router();
 
 //Image Storage Engine
 const storage  = multer.diskStorage({
        destination : "uploads",
        filename : (req, file, cb)=>{
            return cb(null,`${Date.now()}${file.originalname}`);
        }
 }) ;

 const upload = multer({storage:storage});

 foodRouter.post("/add",upload.single("image"),addFood);
 foodRouter.get("/list",listFood); // Assuming you have a listFood function in your controller
 foodRouter.delete("/remove/:id",removeFood); // Assuming you have a removeFood function in your controller





export default foodRouter;