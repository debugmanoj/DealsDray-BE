import express from "express";
import adminRoutes from "./adminRoutes.js";
const router = express.Router();
router.use("/adminRoutes", adminRoutes);
export default router;
