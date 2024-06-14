const express = require("express");
const userRoutes = express.Router();
const userController = require('../controllers/Usercontroller');

userRoutes.post('/',userController.createUserController);
userRoutes.get('/',userController.getUserController);
userRoutes.get("/:id",userController.getUserByIdController);
userRoutes.patch("/:id",userController.updateUserController);
userRoutes.delete("/:id",userController.deleteUserController);
userRoutes.post("/register",userController.registerUserController);
userRoutes.post("/registeradmin",userController.registerAdminController);
userRoutes.post("/login",userController.loginusercontroller)

module.exports = userRoutes; 
