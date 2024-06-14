const { ValidationErrorItemType } = require('sequelize');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');

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


const loginuser = async (Email,Password)=> {
  const existingUser = await User.findOne({
    where: { Email:Email },
  });

  if (!existingUser) {
    return { error: "user does not exist" };
  }

  const comparePassword = await bcrypt.compare(Password, existingUser.Password);

  if (!comparePassword) {
    return { error: "Invalid Password" };
  } else {
    const generateJwtToken = jwt.sign(
      {
        id: existingUser.id,
        Email: existingUser.Email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return { success: true, token: generateJwtToken };
  }
}

module.exports={
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    register,
    registeradmin,
    loginuser
}
