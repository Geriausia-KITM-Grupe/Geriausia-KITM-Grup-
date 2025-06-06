const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController.js");

// Route to register a new user
// @POST /users/register

router.post("/register", registerUser);

module.exports = router;
