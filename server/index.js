const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors')
const {sequelize} = require('./src/models');
const rootRouter = require('./src/routers/rootRouter');

const app = express();

dotenv.config();

app.use(cors()); 
app.use(express.json());
app.use("/api", rootRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database", err);
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});