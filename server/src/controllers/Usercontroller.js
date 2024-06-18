const {User} = require('../models/User');
const JWT_SECRET = "event"
const nodemailer = require("nodemailer");
const Joi = require('joi');


const {
    createUser,getUser,getUserById,updateUser,deleteUser,register,registeradmin,loginuser,resetPassword,forgetPassword
} = require('../services/Userservice');





let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'dinkyjani27@gmail.com', 
      pass: 'ccqf nslr ojkt tkug' 
  }
});

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
    const user = await getUserById(req.params.id);
    const updatedUser = await updateUser(req.params.id, req.body);

    if (user.Request === 'pending' && req.body.Request === 'approve') {
      sendApprovalEmail(user.Email);
    } else if (user.Request === 'pending' && req.body.Request === 'reject') {
      sendRejectionEmail(user.Email);
    }

    if(user.Status==="active" && req.body.Status === 'deactive'){
      sendDeactiveEmail(user.Email)
    }

    res.status(200).json(updatedUser);
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
        await sendEmailToAdmin(Name, Email);
        res.status(201).json({ message: "Registration successful" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const sendEmailToAdmin = async (Name, Email) => {
  const reviewLink = 'http://localhost:3000/user'
  let info = await transporter.sendMail({
      from: 'dinkyjani27@gmail.com', 
      to: 'jdinky.netclues@gmail.com', 
      subject: 'New User Registration Request', 
       
      html: `
            <p>Hello Admin,</p>
            <p>A new user named ${Name} (${Email}) has registered and is pending approval.</p>
            <p>Please review the registration request <a href="${reviewLink}">here</a> and take necessary action.</p>
            <p>Regards,<br>Your Team</p>
        `
  });

  console.log("Message sent: %s", info.messageId);
}

const sendApprovalEmail = (userEmail) => {
  const mailOptions = {
    from: 'dinkyjani27@gmail.com',
    to: userEmail,
    subject: 'Account Approval',
    text: 'Your account has been approved. You can now log in to your account.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendDeactiveEmail = (userEmail) => {
  const mailOptions = {
    from: 'dinkyjani27@gmail.com',
    to: userEmail,
    subject: 'Account Deactive',
    text: 'Your account has been Deactive. Contact for more info.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


const sendRejectionEmail = (userEmail) => {
  const mailOptions = {
    from: 'dinkyjani27@gmail.com',
    to: userEmail,
    subject: 'Account Rejection',
    text: 'Your registration request has been rejected. If you have any questions, please contact support.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const registerAdminController = async(req,res)=>{
    try {
        const { Name, Email, Password,Phone_No,Gender,User_type} = req.body;
        await registeradmin(Name, Email, Password,Phone_No,Gender,User_type);
        res.status(201).json({ message: "Registration successful" });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const loginusercontroller = async (req, res) => {
  
  const { Email, Password } = req.body;

  const result = await loginuser(Email, Password);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.cookie('jwt', result.token, { httpOnly: true, secure: true, maxAge: 3600000 });
  return res.status(result.status).json({ message: result.message, token: result.token });
};



const forgetPasswordController = async (req, res) => {
  const { Email } = req.body;
  const result = await forgetPassword(Email);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  await sendResetPasswordEmail(Email, result.token);
  res.status(result.status).json({ message: 'Password reset email sent' });
};

const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { Password } = req.body;
  const result = await resetPassword(token, Password);

  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  res.status(result.status).json({ message: result.message });
};

const sendResetPasswordEmail = async (Email, token) => {
  const resetLink = `http://localhost:3000/resetpassword/${token}`;
  let info = await transporter.sendMail({
    from: 'dinkyjani27@gmail.com',
    to: Email,
    subject: 'Password Reset Request',
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Regards,<br>Your Team</p>
    `
  });

  console.log("Password reset email sent: %s", info.messageId);
};




module.exports ={
    createUserController,getUserController,getUserByIdController,updateUserController,deleteUserController,registerUserController
    ,registerAdminController,loginusercontroller,forgetPasswordController,resetPasswordController
}