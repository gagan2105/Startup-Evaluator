import express from "express";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
  
      const aiResponse = await getOpenAIAPIResponse(message);
  
      res.status(200).json({
        success: true,
        response: aiResponse,
      });
  
    } catch (error) {
      console.error("🔥 Route Error FULL:", error); // ✅ log full error
  
      res.status(500).json({
        success: false,
        error: error.message, // ✅ show real error
      });
    }
  });

export default router;