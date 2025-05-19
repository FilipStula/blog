const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JSONSECRET;
const generateToken = (userId, role, username) => {
  try {
    const token = jwt.sign({ userId, role, username}, jwtSecret, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error(error);
    resizeBy.status(500).send({ message: "Error generating JWT" });
  }
};

module.exports = generateToken;
