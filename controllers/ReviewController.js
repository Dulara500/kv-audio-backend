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