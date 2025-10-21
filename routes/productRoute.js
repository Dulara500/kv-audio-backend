import { addproduct } from "../controllers/productController.js";
import express from "express";

const productRoute = express.Router();
productRoute.post("/",addproduct);
export default productRoute;