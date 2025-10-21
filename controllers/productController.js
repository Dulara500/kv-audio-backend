import Product from "../models/Product.js";

export function addproduct(req,res){
    console.log(req.user)
    if(req.user == null){
        res.status(401).json({
            message : "please login"
        });
        return;
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "you are not authorized to preform this action"
        })
        return;
    }

    const data = req.body;
    const newproduct = new Product(data);
    newproduct.save().then(()=>{
        res.json({
            message : "product saved successfully"
        })
    }).catch((error)=>{
        res.status(500).json({
            message : "product couldn't save"
        })
    })
}