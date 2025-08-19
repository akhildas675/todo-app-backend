import User from "../model/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRegister = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const existUser = await User.findOne({ email });
    console.log("existing user data", existUser);

    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      msg: "user registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    console.log("user registration successful");
  } catch (error) {
    console.error("registration error:", error);
    res.status(500).json({ msg: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Enter valid email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    console.log("Login success");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: error.message });
  }
};

export { userRegister, userLogin };
