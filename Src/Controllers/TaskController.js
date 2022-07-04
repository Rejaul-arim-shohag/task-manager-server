const taskModel = require('../Models/taskModel');
exports.createTask=(req, res)=>{
    let reqbody = req.body;
    reqbody.email=req.headers.email;
    taskModel.create(reqbody, (err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.deleteTask=(req, res)=>{
    const id=req.params.id;
    const query={
        _id:id
    }
    taskModel.remove(query,(err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.updateTaskStatus=(req, res)=>{
    const id=req.params.id;
    let status= req.params.status;
    const query={ _id:id}
    const reqBody={status:status}
    taskModel.updateOne(query,reqBody,(err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })

}

exports.listsTaskByStatus=(req,res)=>{
    const status = req.params.status;
    const email = req.headers.email;
    taskModel.aggregate([
        {$match:{status:status, email:email}},
        {$project:{
            _id:1, title:1, description:1, status:1,
            createdDate:{
                $dateToString:{
                    date:"$createDate",
                    format:"%d-%m-%Y"
                }
            }
        }}

    ], (err,data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}

exports.taskStatusCount=(req, res)=>{
    const email = req.headers.email;
    taskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status", sum:{$count:{}}}}
    ],(err, data)=>{
        if(err){
            res.status(400).json({"status":"fail", "data":err})
        } else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
}