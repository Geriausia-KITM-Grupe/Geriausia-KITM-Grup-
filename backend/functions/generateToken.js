const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const generatedJWT = jwt.sign({ id }, process.env.JWT_SALT, {
    expiresIn: "365d", // Token galioja 365 dienas
  });
  return generatedJWT;
};

module.exports = { generateToken };
