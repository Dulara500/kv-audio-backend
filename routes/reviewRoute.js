import { addReview, deleteReview, getReview, updateReviews } from "../controllers/ReviewController.js";
import express from "express";

const reviewRoute = express.Router();
reviewRoute.post('/',addReview);
reviewRoute.get('/',getReview);
reviewRoute.put('/approve/:email',updateReviews);
reviewRoute.delete('/:email',deleteReview);
export default reviewRoute;