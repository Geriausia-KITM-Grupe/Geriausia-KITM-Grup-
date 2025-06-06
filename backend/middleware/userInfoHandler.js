const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserInfo = async (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: process.env.NOT_AUTHORIZED_NO_TOKEN };
      }
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SALT);
      // Find the user by ID
      const user = await User.findById(decoded.id).select("-password");

      return { status: 200, response: user };
    } catch (error) {
      return { status: 401, response: process.env.NOT_AUTHORIZED };
    }
  }
  return { status: 401, response: process.env.NOT_AUTHORIZED };
};

module.exports = { getUserInfo };
