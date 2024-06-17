const express = require("express");
const rootRouter = express.Router();

const userRoutes = require('./Userroute');
const eventRoutes = require("./Eventroute");

rootRouter.use('/user',userRoutes);
rootRouter.use('/event',eventRoutes)

module.exports = rootRouter;