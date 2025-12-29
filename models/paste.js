import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Optional: Automatically delete expired pastes
pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;
