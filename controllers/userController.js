import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export function registerUser(req,res){
    const data = req.body

    data.password = bcrypt.hashSync(data.password,10) 

    const newuser = new User(data)
    
    newuser.save().then(()=>{
        res.json({
            message : "user registered successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "user couldn't register"
        })
    })

}

export function loginuser(req,res){
    const data = req.body

    User.findOne({
        email : data.email
    }).then((user)=>{
        if(user == null){
            res.status(404).json({
                message : "user not found"
            })
        }else{
            const ispasswordCorrect = bcrypt.compareSync(data.password,user.password);
            if(ispasswordCorrect){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                    email : user.email
                },process.env.JWT_SECRETKEY)
                res.json({
                    message : "login succressfull",
                    token : token
                })
            }else{
                res.status(401).json({  
                    message : "login failed"
                })
            }
        }
    })
}
