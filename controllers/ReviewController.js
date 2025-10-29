import { response } from "express";
import Review from "../models/Review.js";

export function addReview(req,res){
    if(req.user==null){
        res.status(401).json({
            message : "please login and try again"
        })
        return 
    }
    
    const data = req.body

    data.name = data.firstName + " " + data.lastName
    data.email = req.user.email
    data.profilePic = req.user.profilePic

    const newReview = new Review(data);

    newReview.save().then(()=>{
        res.json({
            message : "review added successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            error : "review addition is failed"
        })
    });

}

export async function getReview(req,res){
    try{
        const user = req.user;
        if(user == null || user.role != "admin"){
        
            const reviews = await Review.find({isApproved:true})
            res.json(reviews)
            return
        }
        const reviews = await Review.find()
        res.json(reviews);
    }catch(e){
        res.json(e)
    }      
}

export async function deleteReview(req,res){
    try{
        const email = req.params.email;
        if(req.user == null){
            res.json({
                message : "please login try again"
            });
            return 
        }

        if(req.user.role == "admin"){
        
            await Review.deleteOne({email:email})
            res.json({
                message : "review deleted successfully"
            })
            
            return 
        }

        if(req.user.role == "customer"){
            if(req.user.email == email){
                
                await Review.deleteOne({email:email})
                res.json({
                    message : "review deleted successfully"
                })
                return 
            }else{
                res.status(403).json({
                    message : "you are not authorized to perform this action"
                })
            }
        }
    }catch(e){
        console.error(e)
        res.status(500).json({
            error : "review deletion failed "+e
        })
    }    
}

export async function updateReviews(req,res){
    try{
        const email = req.params.email;
        if(req.user == null){
            res.json({
                message : "please login try again later"
            })
            return 
        }

        if(req.user.role == "admin"){
            await Review.updateOne({email:email},{isApproved:true})
                res.json({
                    message : "review approved successfully"
                })
        }else{
            res.status(403).json({
                message : "only admins can approve reviews"
            })
        }
    }catch(e){
        res.json({
            message : "review approvel failed "
        })
        console.error(e)
    }
    
}