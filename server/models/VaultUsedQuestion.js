import mongoose from "mongoose";

const VaultUsedQuestionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  questionHash: {
    type: String,
    required: true
  }

});

export default mongoose.model(
  "VaultUsedQuestion",
  VaultUsedQuestionSchema
);