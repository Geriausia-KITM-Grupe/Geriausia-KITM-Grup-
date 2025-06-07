const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController.js");

// Route to register a new user
// @POST /users/register

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);

module.exports = router;
