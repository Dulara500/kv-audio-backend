import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());

let mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
let connection = mongoose.connection;

connection.once("open",()=>{
    console.log("mongodb connectoin established successfully");
});

app.use((req,res,next)=>{
    let token = req.header("Authorization")
    
    
    
    if(token!=null){
        token = token.replace("Bearer ","");
        jwt.verify(token,"hi123",(err,decoded)=>{
            if(!err){
                req.user = decoded;
            }
        })
    }
    next()
    
})

app.use("/api/users",userRouter);
app.use("/api/product",productRoute);

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});