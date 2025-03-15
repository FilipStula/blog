const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JSONSECRET;
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.cookie.split('=')[1]
    console.log(token);
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, jwtSecret);
    req.role = decoded.role; //define .role, so it can be passed to the next middleware 
    next();// go to the next middleware
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
