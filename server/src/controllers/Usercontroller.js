const {User} = require('../models/User');
const JWT_SECRET = "event"
const {
    createUser,getUser,getUserById,updateUser,deleteUser,register,registeradmin,loginuser
} = require('../services/Userservice');


const createUserController = async (req,res) =>{
    try{
        const user = await createUser(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const getUserController = async(req,res)=>{
    try{
        const users = await getUser();
        res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUserByIdController = async(req,res)=>{
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const updateUserController = async(req,res)=>{
    try{
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const deleteUserController = async(req,res)=>{
    try {
        await deleteUser(req.params.id);
        return res.status(200).json({ message: "deleted successfully" });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

const registerUserController = async(req,res) =>{
    try {
        const { Name, Email, Password,Mobile_No,Gender} = req.body;
        await register(Name, Email, Password,Mobile_No,Gender);
        res.status(201).json({ message: "Registration successful" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const registerAdminController = async(req,res)=>{
    try {
        const { Name, Email, Password,Phone_No,Gender,User_type} = req.body;
        await registeradmin(Name, Email, Password,Phone_No,Gender,User_type);
        res.status(201).json({ message: "Registration successful" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const loginusercontroller = async(req,res)=>{
    try{
        const { Email ,Password} = req.body;
        const result = await loginuser(Email ,Password);
  
      if (result.error) {
        return res.status(400).json({ message: result.error });
      } else {
        return res
          .status(200)
          .cookie("authToken", result.token, {
            secure: true,
            httpOnly: true,
            sameSite: "none",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          })
          .json({ message: "success" , token: result.token});
      }

    }catch (error) {
        res.status(400).json({ error: error.message });
      }
}



  
module.exports ={
    createUserController,getUserController,getUserByIdController,updateUserController,deleteUserController,registerUserController
    ,registerAdminController,loginusercontroller
}