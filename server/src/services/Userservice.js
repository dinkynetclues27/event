const { ValidationErrorItemType } = require('sequelize');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const JWT_SECRET = "event"

const createUser = async(data)=>{
    try{
        const user = await User.create(data);
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const getUser = async()=>{
    try{
        const users = await User.findAll({where:{User_type:"user"}});
        return users;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const getUserById = async(id)=>{
    try{
        const users = await User.findByPk(id);

   if (!users) {
            throw new Error('User not found');
        }
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async (id, data) => {
    try {
  
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }
        await user.update(data);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        console.log("user deleted")
    } catch (error) {
        throw new Error(error.message);
    }
};

const register = async(Name,Email,Password,Mobile_No,Gender)=>{
    try{
    const existingUser = await User.findOne({ where: { Email: Email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    await User.create({
      Name:Name,
      Email:Email,
      Password:hashedPassword,
      Mobile_No:Mobile_No,
      Gender:Gender
      });
    } catch (error) {
      throw new Error(error.message);
    }
}

const registeradmin = async(Name,Email,Password,Phone_No,Gender)=>{
    try{
    const existingUser = await User.findOne({ where: { Email: Email } });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    await User.create({
      Name:Name,
      Email:Email,
      Password:hashedPassword,
      Phone_No:Phone_No,
      Gender:Gender,
      User_type: "admin"
      });
    } catch (error) {
      throw new Error(error.message);
    }
}


const loginuser = async (Email, Password) => {
  try {
      const user = await User.findOne({ where: { Email } });

      if (!user) {
          return { error: 'User not found', status: 404 };
      }

      if (user.Request !== 'approve') {
          return { error: 'User request not approved', status: 403 };
      }

      const isPasswordValid = await bcrypt.compare(Password, user.Password);

      if (!isPasswordValid) {
          return { error: 'Invalid password', status: 401 };
      }

      const token = jwt.sign(
          {
              Email: user.Email,
              id: user.id,
              User_type: user.User_type,
          },
          JWT_SECRET,
          { expiresIn: '1h' } 
      );

      console.log("Generated JWT token:", token);
      return { message: 'Login successful', token, status: 200 };

  } catch (error) {
      console.error("Error logging in:", error);
      return { error: 'Internal Server Error', status: 500 };
  }
};


module.exports={
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    register,
    registeradmin,
    loginuser,

}
