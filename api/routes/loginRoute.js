const { loginController } = require("../controllers/loginController");

const loginRouter = require("express").Router();

// SIGNUP ROUTE
loginRouter.use("/login", loginController);

module.exports = {
  loginRouter,
};
