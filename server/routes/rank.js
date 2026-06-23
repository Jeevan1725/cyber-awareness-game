import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* =========================
   GET RANKINGS
========================= */

router.get("/", async (req,res)=>{

  try{

    const users = await User.find({})
      .sort({ score: -1 })
      .limit(10)
      .select("username score");

    res.json(users);

  }catch(error){

    console.error(error);
    res.status(500).json({message:"Server error"});

  }

});

export default router;