const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userModel } = require("../models/userModel");

const jwtSecret = process.env.JWT_SECRET;

const signupController = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const {
      username,
      password,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, salt);

    await userModel.collection.insertOne({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
    });

    const createdUser = (await userModel.find({ username: username }))[0];
    if (createdUser) {
      jwt.sign(
        { userId: createdUser._id, username: createdUser.username },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.log("Error in jwt signing", err);
          } else {
            res
              .cookie("token", token, { secure: true, sameSite: "none" })
              .status(201)
              .json({
                userId: createdUser._id.toString(),
                username: createdUser.username,
              });
          }
        }
      );
    } else {
      console.log("User not found at register controller");
      res.status(400).json("User not found");
    }
  } catch (error) {
    console.log(`Error encountered at register route: ${error}`);
  }
};

module.exports = {
  signupController,
};
