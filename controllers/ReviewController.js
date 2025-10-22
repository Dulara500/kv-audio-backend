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

export function getReview(req,res){
    const user = req.user;
    if(user == null || user.role != "admin"){
        Review.find({isApproved:true}).then((reviews)=>{
            res.json(reviews)
        })
        return
    }

    if(user.role == "admin"){
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
    }
}

export function deleteReview(req,res){
    const email = req.params.email;
    if(req.user == null){
        res.json({
            message : "please login try again"
        });
        return 
    }

    if(req.user.role == "admin"){
        Review.deleteOne({email:email}).then(()=>{
            res.json({
                message : "review deleted successfully"
            })
        }).catch(()=>{
            res.status(500).json({
                error : "review deletion failed"
            })
        });
        return 
    }
    if(req.user.role == "customer"){
        if(req.user.email == email){
            Review.deleteOne({email:email}).then(()=>{
                res.json({
                    message : "review deleted successfully"
                })
            }).catch(()=>{
                res.status(500).json({
                    rror : "review deletion failed"
                })
            });
            return 
        }else{
            res.status(403).json({
                message : "you are not authorized to perform this action"
            })
        }
    }   
}

export function updateReviews(req,res){
    const email = req.params.email;
    if(req.user == null){
        res.json({
            message : "please login try again later"
        })
        return 
    }

    if(req.user.role == "admin"){
        Review.updateOne({email:email},{isApproved:true}).then(()=>{
            res.json({
                message : "review approved successfully"
            })
        }).catch(()=>{
            res.json({
                message : "review approvel failed"
            })
        })
    }else{
        res.status(403).json({
            message : "only admins can approve reviews"
        })
    }
}