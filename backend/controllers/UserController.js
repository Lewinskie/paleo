const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const expressAsyncHandler = require("express-async-handler");

const signup = expressAsyncHandler(async (req, res) => {
  //   DESTRUCTURE REQ.BODY
  const { name, email, password, isAdmin } = req.body;
  //  FIRST CHECK IF USER EXISTS USING UNIQUE EMAIL
  const newUser = await User.findOne({ email });
  if (newUser)
    res.status(400).json({ msg: "User alrready exists, please log in" });

  //   CHECK PASSWORD LENGTH
  if (password.length < 6)
    res
      .status(400)
      .json({ msg: "Password should be atleast 6 charactres long" });

  // PASSWORD ENCRYPTION
  const hashedPassword = await bcrypt.hash(password, 10);
  //   CREATE USER
  const user = await new User({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });

  // SAVE NEWUSER TO MONGO
  await user.save();
  res.status(201).send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

const signin = expressAsyncHandler(async (req, res) => {
  // DESTRUCTURE REQ.BODY
  const { email, password } = req.body;

  //   CHECK IF USER EXISTS
  const user = await User.findOne({ email });
  if (user) {
    //   COMPARE IF PASSWORDS MATCH
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(400).json({ msg: "Invalid email or password" });
});

exports.signup = signup;
exports.signin = signin;
