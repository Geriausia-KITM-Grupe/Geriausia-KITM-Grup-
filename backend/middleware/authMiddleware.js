const asyncHandler = require("express-async-handler");
const { getUserInfo } = require("../middleware/userInfoHandler");

const protect = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUserInfo(req);

  if (status === 200) {
    req.user = response; // Attach user info to the request object
    if (req.user.status === false) {
      return res.status(403).json({ message: "User is banned" });
    }
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(status).send(response); // Send the error response
  }
});

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, adminOnly };
