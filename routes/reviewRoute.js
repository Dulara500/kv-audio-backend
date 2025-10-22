import { addReview, getReview } from "../controllers/ReviewController.js";
import express from "express";

const reviewRoute = express.Router();
reviewRoute.post('/',addReview);
reviewRoute.get('/',getReview)
export default reviewRoute;