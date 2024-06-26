const express = require("express");
const userRoutes = express.Router();
const userController = require('../controllers/Usercontroller');
const {authenticateUser} = require('../middleware/authenticate');

const {User} = require("../models")


userRoutes.post('/',userController.createUserController);
userRoutes.get('/',authenticateUser,userController.getUserController);
userRoutes.get("/:id",authenticateUser,userController.getUserByIdController);
userRoutes.patch("/:id",userController.updateUserController);
// userRoutes.patch("/")
userRoutes.delete("/:id",authenticateUser,userController.deleteUserController);
userRoutes.post("/register",userController.registerUserController);
userRoutes.post("/registeradmin",userController.registerAdminController);
userRoutes.post("/login",userController.loginusercontroller)

userRoutes.post('/forgetpassword', userController.forgetPasswordController);
userRoutes.post('/resetpassword/:token', userController.resetPasswordController);

module.exports = userRoutes; 
