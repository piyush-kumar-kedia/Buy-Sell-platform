import User from "./model.js";
import { generateToken } from "../middleware/authController.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const newUser = new User({ username, email, password, phone });
    await newUser.save();
    const token = generateToken(newUser);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Not a registered email" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ message: "Login successful", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Logout Controller
export const logoutUser = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout failed:", error);
    return res.status(500).json({ message: "Server error while logging out." });
  }
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
  });
};
