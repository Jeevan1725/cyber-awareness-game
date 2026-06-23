import express from "express";
import Answer from "../models/Answer.js";

const router = express.Router();

/* SAVE ANSWER */

router.post("/", async (req,res)=>{

const {storyId,sceneId,selected,correct,userId,topic} = req.body;

const ans = new Answer({
userId,
storyId,
sceneId,
selected,
correct
});

await ans.save();


const User = (await import("../models/User.js")).default;
if (userId) {
	if (correct) {
		await User.findByIdAndUpdate(userId, { $inc: { score: 1 } });
	} else if (topic) {
		await User.findByIdAndUpdate(userId, { $addToSet: { weakness: topic } });
	}
}

res.json({message:"Answer saved"});

});


/* SCORE API */

router.get("/score", async (req,res)=>{

const total = await Answer.countDocuments();
const correct = await Answer.countDocuments({correct:true});

res.json({
total,
correct,
score: total===0 ? 0 : (correct/total)*100
});

});

/* GET ANSWERS BY USER AND STORY */

router.get("/user/:userId/story/:storyId", async (req,res)=>{

const {userId, storyId} = req.params;

const answers = await Answer.find({userId, storyId: Number(storyId)});

res.json(answers);

});

export default router;