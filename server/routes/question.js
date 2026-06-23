import express from "express";
import { generateQuestion, markQuestionUsed } from "../utils/questionEngine.js";
import User from "../models/User.js";

const router = express.Router();

/* TEMP MEMORY STORE FOR CORRECT ANSWERS */
const questionStore = new Map();


/* =========================
   GENERATE QUESTION
========================= */

router.get("/generate/:userId", async (req,res)=>{

  try{

    const user = await User.findById(req.params.userId);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const q = await generateQuestion(user);

    if(!q){
      return res.json({message:"No question available"});
    }

    /* STORE ANSWER SECURELY ON SERVER */
    questionStore.set(req.params.userId, {
      answer: q.answer,
      question: q.question
    });

    /* SEND ONLY QUESTION */
    res.json({
      question: q.question
    });

  }catch(error){

    console.error(error);
    res.status(500).json({message:"Server error"});

  }

});


/* =========================
   VERIFY ANSWER
========================= */

router.post("/verify", async (req,res)=>{

  try {

    const { userId, answer } = req.body;

    const stored = questionStore.get(userId);

    if(!stored){
      return res.status(400).json({message:"Question expired"});
    }

    const correctAnswer = stored.answer;
    const questionText = stored.question;

    /* WRONG ANSWER */

    if (answer !== correctAnswer) {

      questionStore.delete(userId);

      return res.status(400).json({
        message: "Wrong answer. Please try again."
      });

    }

    /* CORRECT ANSWER */

    await markQuestionUsed(userId, questionText);

    questionStore.delete(userId);

    res.json({
      verified: true,
      message: "Access granted."
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({message:"Server error"});

  }

});


/* =========================
   COMPLETE STREAK
========================= */

router.post("/complete-streak", async (req,res)=>{

  try {

    const { userId, allCorrect } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({message:"User not found"});

    if (!user.lastStreakDate) user.lastStreakDate = null;

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);

    let lastStreakStr = null;

    if (user.lastStreakDate) {

      if (user.lastStreakDate instanceof Date) {
        lastStreakStr = user.lastStreakDate.toISOString().slice(0, 10);
      } else {
        lastStreakStr = user.lastStreakDate.slice(0, 10);
      }

    }

    if (allCorrect) {

      if (lastStreakStr === todayStr) {

        return res.json({ message: "Already completed today." });

      }

      if (lastStreakStr && new Date(todayStr) - new Date(lastStreakStr) > 86400000) {

        user.streak = 1;

      } else {

        user.streak += 1;

      }

      user.lastStreakDate = today;

      await user.save();

      res.json({
        verified: true,
        streak: user.streak,
        message: "Streak updated!"
      });

    } else {

      user.streak = 0;
      user.lastStreakDate = today;

      await user.save();

      res.json({ message: "Streak reset." });

    }

  } catch (error) {

    console.error(error);
    res.status(500).json({message:"Server error"});

  }

});

export default router;