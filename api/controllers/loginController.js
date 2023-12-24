const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModel } = require("../models/userModel");

const jwtSecret = process.env.JWT_SECRET;

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await userModel
      .findOne({ username: username })
      .then((user) => user);

    if (foundUser) {
      const passOk = bcrypt.compareSync(password, foundUser.password);
      if (passOk) {
        jwt.sign(
          { userId: foundUser._id, username: foundUser.username },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { secure: true, sameSite: "none" })
              .json({
                id: foundUser._id,
              });
          }
        );
      }
    } else {
      console.log("User not found at register controller");
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(`Error encountered at register route: ${error}`);
  }
};

module.exports = {
  loginController,
};
