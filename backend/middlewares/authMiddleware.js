const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asynchandler = require("express-async-handler");
const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedEntry = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedEntry.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized ");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized ");
  }
});
module.exports = { protect };
