import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


/* =========================
   REGISTER
========================= */

/* =========================
   GET USER BY ID
========================= */

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* UPDATE STORY PROGRESS */

router.put("/user/:id/progress", async (req, res) => {
  try {
    const { storyId, sceneIndex } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.storyProgress) user.storyProgress = new Map();
    user.storyProgress.set(storyId.toString(), sceneIndex);
    await user.save();
    res.json({ message: "Progress updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {

  try {

    const {
      username,
      email,
      password,
      securityAnswers
    } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      });
    }

    // check existing user
    const existingUser = await User.findOne({
      $or: [
        { email },
        { username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      securityAnswers
    });

    await newUser.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

});


/* =========================
   LOGIN (EMAIL OR USERNAME)
========================= */

router.post("/login", async (req, res) => {

  try {

    const { login, password } = req.body;

    // find user by email OR username
    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      "cyberverse_secret",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed"
    });

  }

});


export default router;