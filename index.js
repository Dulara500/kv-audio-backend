import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import jwt, { decode } from "jsonwebtoken";

const app = express();
app.use(bodyParser.json());

let mongoUrl = "mongodb+srv://admin:123@cluster0.wzvlsik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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