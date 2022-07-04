const express = require('express');
const router = express.Router();
const authVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')
const UserController = require('../Controllers/UserController')
const TaksController = require('../Controllers/TaskController')

//user 
router.get("/test", UserController.test)
router.post("/registration", UserController.userRegistration);
router.post("/login", UserController.login);
router.post("/profileUpdate",authVerifyMiddleware, UserController.profileUpdate);

//task
router.post("/createTask",authVerifyMiddleware, TaksController.createTask);
router.get("/deleteTask",authVerifyMiddleware, TaksController.deleteTask);
router.get("/updateTaskStatus/:id/:status",authVerifyMiddleware, TaksController.updateTaskStatus);
router.get("/listsTaskByStatus/:status",authVerifyMiddleware, TaksController.listsTaskByStatus);
router.get("/taskStatusCount",authVerifyMiddleware, TaksController.taskStatusCount);



module.exports = router;