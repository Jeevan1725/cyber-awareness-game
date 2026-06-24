import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import os from "os";

import authRoutes from "./routes/auth.js";
import vaultRoutes from "./routes/vault.js";
import questionRoutes from "./routes/question.js";
import answerRoutes from "./routes/answer.js";
import streakRoutes from "./routes/streak.js";
import rankRoutes from "./routes/rank.js";

import gTTS from "gtts";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/vault", vaultRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/streak", streakRoutes);
app.use("/api/rank", rankRoutes);

/* TTS */

app.post("/speak", async (req,res)=>{

try{

const { text, language } = req.body;

const filePath = path.join(os.tmpdir(), "output.mp3");

const tts =
new gTTS(text, language);

tts.save(filePath,function(err){

if(err){

console.log(err);

return res
.status(500)
.send("TTS Error");

}

res.sendFile(filePath);

});

}
catch(error){

console.log(error);

res.status(500).send("TTS Error");

}

});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`TTS Server running on port ${PORT}`);
  });
}

export default app;