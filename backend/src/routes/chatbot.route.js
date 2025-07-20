import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createChatbot,
  getUserChatbots,
  deleteChatbot,
  sendMessageToChatbot,
} from "../controllers/chatbot.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createChatbot);
router.get("/", protectRoute, getUserChatbots);
router.delete("/:id", protectRoute, deleteChatbot);
router.post("/send/:id", protectRoute, sendMessageToChatbot);

export default router;