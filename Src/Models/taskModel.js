const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    title:{type: String},
    description:{type: String},
    status:{type: String},
    email:{type: String},
    createDate:{type:Date, default:Date.now()},
}, {versionKey:false});

const TaskModel = mongoose.model("tasks", taskSchema);
module.exports = TaskModel;