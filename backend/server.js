require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server up and running on port ===> " + process.env.PORT);
});
