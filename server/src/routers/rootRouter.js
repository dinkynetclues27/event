const express = require("express");
const rootRouter = express.Router();

const userRoutes = require('./Userroute');

rootRouter.use('/user',userRoutes);

module.exports = rootRouter;