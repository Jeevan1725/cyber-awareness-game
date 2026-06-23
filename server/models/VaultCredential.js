import mongoose from "mongoose";

const VaultCredentialSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  site: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }

});

export default mongoose.model("VaultCredential", VaultCredentialSchema);