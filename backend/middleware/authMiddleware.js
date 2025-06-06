const asyncHandler = require("express-async-handler");
const { getUserInfo } = require("../middleware/userInfoHandler");

const protect = asyncHandler(async (req, res, next) => {
  const { status, response } = await getUserInfo(req);

  if (status === 200) {
    req.user = response; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } else {
    res.send(status, response); // Send the error response
  }
});

module.exports = { protect };
