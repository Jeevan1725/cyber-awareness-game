import express from "express";
import User from "../models/User.js";

const router = express.Router();


/* =========================
   INCREMENT STREAK
========================= */

router.post("/increment", async (req, res) => {

  const { userId, date } = req.body;
  console.log("Streak increment called with:", { userId, date, userIdType: typeof userId });

  // Handle different userId formats
  let actualUserId = userId;
  if (typeof userId === 'object' && userId.$oid) {
    actualUserId = userId.$oid;
  }

  console.log("Using actualUserId:", actualUserId);

  if (!actualUserId)
    return res.status(400).json({ error: "User ID required" });

  const today = new Date().toDateString();
  console.log("Parsed date:", today);

  try {

    const user = await User.findById(actualUserId);
    console.log("User lookup result:", user ? { id: user._id.toString(), username: user.username, streak: user.streak } : "null");
    
    // Also try finding by string ID if ObjectId lookup fails
    if (!user && actualUserId && typeof actualUserId === 'string') {
      console.log("Trying string lookup for userId:", actualUserId);
      const userByString = await User.findOne({ _id: actualUserId });
      console.log("String lookup result:", userByString ? { id: userByString._id.toString(), username: userByString.username, streak: userByString.streak } : "null");
      if (userByString) {
        user = userByString;
      }
    }

    if (!user)
      return res.status(404).json({ error: "User not found" });

    const lastDate = user.lastStreakDate
      ? new Date(user.lastStreakDate).toISOString().slice(0, 10)
      : null;


    /* Already answered today */

    if (lastDate === today) {

      return res.json({
        message: "Already completed today",
        streak: user.streak
      });

    }


    /* Check if user missed a day */

    if (lastDate) {

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastDate !== yesterdayStr) {

        user.streak = 0;

      }

    }


    /* Increment streak */

    user.streak = (user.streak || 0) + 1;

    user.lastStreakDate = today;

    await user.save();
    console.log("Streak updated to:", user.streak);

    res.json({
      message: "Streak updated",
      streak: user.streak
    });

  } catch (err) {

    console.error("Streak increment error:", err);
    console.error("Error stack:", err.stack);

    res.status(500).json({
      error: "Server error",
      details: err.message
    });

  }

});

export default router;