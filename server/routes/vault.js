import express from "express";
import Credential from "../models/VaultCredential.js";
import auth from "../middleware/auth.js";
import { encryptPassword, decryptPassword } from "../utils/cryptoUtils.js";

const router = express.Router();


/* =========================
   ADD NEW CREDENTIAL
========================= */

router.post("/add", auth, async (req, res) => {

  try {

    const { site, password } = req.body;

    const userId = req.userId;

    const encryptedPassword = encryptPassword(password, userId);

    const credential = new Credential({
      userId,
      site,
      password: encryptedPassword
    });

    await credential.save();

    res.json({ message: "Credential saved" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


/* =========================
   GET ALL USER CREDENTIALS
========================= */

router.get("/list", auth, async (req, res) => {

  try {

    const data = await Credential.find({
      userId: req.userId
    });

    res.json(data);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


/* =========================
   VIEW PASSWORD
========================= */

router.get("/password/:id", auth, async (req, res) => {

  try {

    const credential = await Credential.findById(req.params.id);

    if (!credential)
      return res.status(404).json({ message: "Credential not found" });

    /* Prevent accessing another user's password */

    if (credential.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const decrypted = decryptPassword(
      credential.password,
      credential.userId.toString()
    );

    res.json({
      password: decrypted
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


/* =========================
   DELETE CREDENTIAL
========================= */

router.delete("/delete/:id", auth, async (req, res) => {

  try {

    const credential = await Credential.findById(req.params.id);

    if (!credential)
      return res.status(404).json({ message: "Credential not found" });

    /* Prevent deleting another user's credential */

    if (credential.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Credential.findByIdAndDelete(req.params.id);

    res.json({ message: "Credential deleted" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});


export default router;