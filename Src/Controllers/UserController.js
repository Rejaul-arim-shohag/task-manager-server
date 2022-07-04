const UserModel = require ("../Models/userModel.js");
var jwt = require('jsonwebtoken');

exports.test=(req, res)=>{
    res.status(200).send({"status":"success", "data":"test success"})
}
exports.userRegistration =(req, res)=>{
    UserModel.create(req.body, (err,data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.login=(req, res)=>{
    const reqBody = req.body;
    UserModel.aggregate([
        {$match:reqBody},
        {$project:{
            _id:0,
            email:1,
            firstName:1,
            lastName:1,
            phone:1,
            photo:1
        }}
    ], (err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            if(data.length>0){
                let Payload={exp: Math.floor(Date.now() / 1000) + (24*60*60), data:data[0]["email"]};
                let token = jwt.sign( Payload,'SecretKey123456789');
                res.status(200).json({"status":"success", "token":token, "data":data[0]})
            } else{
                res.status(401).json({"status":"unauthorized",})
            }
        }
    })
}

exports.profileUpdate=(req, res)=>{
    const email = req.headers['email'];
    const reqBody =req.body;
    UserModel.updateOne({email:email}, reqBody, (err,data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}