import express from "express";
import AuthRoutes from "./auth.route.js";
import ConversationRoutes from "./conversation.route.js";
import MessageRoutes from "./message.route.js";
import UserRoutes from "./user.route.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);
router.use("/conversation", ConversationRoutes);
router.use("/message", MessageRoutes);

export default router;
