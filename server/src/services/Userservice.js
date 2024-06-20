const { ValidationErrorItemType } = require('sequelize');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const JWT_SECRET = "event"
const Joi = require('joi')

const createRegisterSchema = Joi.object({
  Name: Joi.string().required(),
  Email: Joi.string().email().required(),
  Password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 6 characters long',
    }),
  Mobile_No: Joi.string()
    .pattern(new RegExp('^[6-9]\\d{9}$'))
    .required()
    .messages({
      'string.pattern.base': 'Mobile number must be exactly 10 digits long and start with a digit from 6, 7, 8, or 9',
    }),
  Gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .required(),
});

const createLoginSchema = Joi.object({
  Email: Joi.string().email().required(),
  Password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})'))
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one special character, one digit, and be at least 6 characters long',
    }),
})
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

      const validation = createRegisterSchema.validate({
        Name: Name,
        Email: Email,
        Password: Password,
        Mobile_No: Mobile_No,
        Gender: Gender,
      });
      
      if (validation.error) {
        throw new Error(validation.error.details[0].message);
      }
  
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
    
    const validation = createLoginSchema.validate({
      Email: Email,
      Password: Password,
      });

      if (validation.error) {
        throw new Error(validation.error.details[0].message);
      }
      const user = await User.findOne({ where: { Email } });

      if (!user) {
          return { error: 'User not found', status: 404 };
      }

      if (user.Request !== 'approve') {
          return { error: 'User request not approved', status: 403 };
      }

      if (user.Status !== 'active'){
          return { error: " User is deactive",status:403}
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

const forgetPassword = async (Email) => {
  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return { error: 'User not found', status: 404 };
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token, status: 200 };
  } catch (error) {
    console.error("Error in forgetPassword:", error);
    return { error: 'Internal Server Error', status: 500 };
  }
};

const resetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return { error: 'User not found', status: 404 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.Password = hashedPassword;
    await user.save();

    return { message: 'Password has been reset', status: 200 };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ error: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(400).json({ error: 'Invalid token' });
    } else {
      res.status(500).json({ message: error.message });
    }
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
    forgetPassword,
    resetPassword,
}
