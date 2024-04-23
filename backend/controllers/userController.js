const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  } else {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("problem creating user");
    }
  }
});
module.exports = { registerUser };
