require("dotenv").config();
const jwt = require("jsonwebtoken");

//Creates a JWT Token
module.exports.createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
      //Expires in 3 days
      expiresIn: 3 * 24 * 60 * 60,
    });
  };