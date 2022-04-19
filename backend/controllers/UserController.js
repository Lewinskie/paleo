const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    //   DESTRUCTURE REQ.BODY
    const { name, email, password, isAdmin } = req.body;
    //  FIRST CHECK IF USER EXISTS USING UNIQUE EMAIL
    const user = await User.findOne({ email });
    if (user)
      res.status(400).json({ msg: "User alrready exists, please log in" });

    //   CHECK PASSWORD LENGTH
    if (password.length < 6)
      res
        .status(400)
        .json({ msg: "Password should be atleast 6 charactres long" });

    // PASSWORD ENCRYPTION
    const hashedPassword = await bcrypt.hash(password, 10);
    //   CREATE USER
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    // SAVE NEWUSER TO MONGO
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createUser = createUser;
