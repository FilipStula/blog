const jwt = require("jsonwebtoken");
const jsonSecret = process.env.JSONSERRET;

const isAdmin = (req, res, next) => {
  try {
    console.log(req.role);
    const role = req.role;
    if (role === "admin") {
      res.status(201).send({ message: "User is admin" });
      next();
    } else res.status(403).send({ message: "User is not authorized" });
  } catch (error) {
    conosle.error(error);
    res.status(500).send({ message: "Error in admin verification" });
  }
};

module.exports = isAdmin;
