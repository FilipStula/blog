const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// TODO: Create User collection, so when the comment is created userId will be needed

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// we need to hash the password when saving it to the database
// this code here is responsible for doing stuff before the item is added to the database
// so before .save() funciton, this executes
usersSchema.pre("save", async function (next) {
  const user = this; // this keyword here, refers to the object that will be saved oce this function executes
  if (!user.isModified("password")) {
    return next();
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds); //generating salt
  const hash = await bcrypt.hashSync(user.password, salt); //hashing a password
  user.password = hash;
  next(); //after this is completed, continue saving
});

// i cant create arrow funciton here, that is why it didnt work the first time
usersSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
