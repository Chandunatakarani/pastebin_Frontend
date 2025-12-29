import express from "express";
import { nanoid } from "nanoid";
import Paste from "../models/paste.js";   // <-- add .js extension
import { getNow } from "../config/getNow.js";  // <-- add .js extension

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { content, expiry } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content required" });
    }

    let expiresAt = null;
    const now = getNow(req);

    if (expiry === "10m") expiresAt = new Date(now.getTime() + 10 * 60 * 1000);
    if (expiry === "1h") expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
    if (expiry === "1d") expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const paste = await Paste.create({
      content,
      shortId: nanoid(8),
      expiresAt,
    });

    res.status(201).json(paste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get Paste by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findOne({ shortId: req.params.id });

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    res.json(paste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
