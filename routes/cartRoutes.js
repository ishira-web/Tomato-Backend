import express from 'express';
import { addToCart,getCart,removeFromCart } from '../controllers/cartController.js';

const cartRoutes = express.Router();


cartRoutes.post("/add",addToCart);
cartRoutes.post("/remove",removeFromCart);
cartRoutes.post("/get",getCart);

export default cartRoutes;

