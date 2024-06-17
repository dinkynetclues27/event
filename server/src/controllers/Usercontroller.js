const {User} = require('../models/User');
const JWT_SECRET = "event"
const nodemailer = require("nodemailer");


const {
    createUser,getUser,getUserById,updateUser,deleteUser,register,registeradmin,loginuser
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


const ResetEmail = async (Email) => {
  const resetLink = 'http://localhost:3000/reset'
  let info = await transporter.sendMail({
      from: 'dinkyjani27@gmail.com', 
      to: Email, 
      subject: 'Password Reset Link', 
       
      html: `
            <p>Hello User,</p>
            <p> Here is you Password Reset Link.</p>
            <p>Please click on this link and reset your password <a href="${resetLink}">here</a> and access your account.</p>
            <p>Regards,<br>Admin</p>
        `
  });
}


const forgetPassword = async (req, res) => {
  try {
    
    const user = await User.findOne({ where : {Email: req.body.Email} });

    
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {expiresIn: "10m",});

    const mailOptions = {
      from: "dinkyjani27@gmail.com",
      to: req.body.Email,
      subject: "Reset Password",
      html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Email sent" });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.JWT_SECRET_KEY
    );


    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await User.findOne({ where: {id: decodedToken.userId} });
    if (!user) {
      return res.status(401).send({ message: "no user found" });
    }
    
    const salt = await bycrypt.genSalt(10);
    req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).send({ message: "Password updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


module.exports ={
    createUserController,getUserController,getUserByIdController,updateUserController,deleteUserController,registerUserController
    ,registerAdminController,loginusercontroller,forgetPassword,resetPassword
}