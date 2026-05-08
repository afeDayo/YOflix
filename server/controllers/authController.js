const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      return res.status(406).json({ message: "Password Mismatch" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res
      .status(201)
      .json({ message: "Registration was Successful", user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    return res
      .status(200)
      .json({ message: "Login was Successful", user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUser = (req, res) => {
  const { userId } = req.user;
  return res.status(200).json({
    id: userId,
  });
};

module.exports = { register, login, getUser, logout };
