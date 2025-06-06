require("dotenv").config();
const connection = require("./config/db.js");
const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/userRoutes.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connection();

//ROUTES

app.use("/users", userRouter); // wwww.localhost:3000/users/register

app.listen(process.env.PORT, () => {
  console.log("Server up and running on port ===> " + process.env.PORT);
});
