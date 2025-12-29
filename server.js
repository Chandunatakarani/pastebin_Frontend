import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import pasteRoutes from "./routes/pasteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/paste", pasteRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));
