import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  // Dynamic security questions
  // user selects any 5 questions from available pool
  securityAnswers: {
    type: Map,
    of: String,
    required: true
  },

  score: {
    type: Number,
    default: 0
  },

  streak: {
    type: Number,
    default: 0
  },

  weakness: {
    type: [String],
    default: []
  },

  lastStreakDate: {
    type: String,
    default: ""
  },

  storyProgress: {
    type: Map,
    of: Number, // storyId -> sceneIndex
    default: new Map()
  }

}, { timestamps: true });

export default mongoose.model("User", UserSchema);