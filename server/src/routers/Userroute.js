const express = require("express");
const userRoutes = express.Router();
const userController = require('../controllers/Usercontroller');
const authenticateUser = require('../middleware/authenticate');


userRoutes.post('/',userController.createUserController);
userRoutes.get('/',authenticateUser,userController.getUserController);
userRoutes.get("/:id",userController.getUserByIdController);
userRoutes.patch("/:id",userController.updateUserController);
// userRoutes.patch("/")
userRoutes.delete("/:id",userController.deleteUserController);
userRoutes.post("/register",userController.registerUserController);
userRoutes.post("/registeradmin",userController.registerAdminController);
userRoutes.post("/login",userController.loginusercontroller)
userRoutes.post("/forget",userController.forgetPassword);
userRoutes.post("/reset",userController.resetPassword);

module.exports = userRoutes; 
