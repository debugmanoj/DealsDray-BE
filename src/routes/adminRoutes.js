import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();
router.post("/checkLogin", adminController.checkLogin);
router.post("/imageUpload", adminController.imageUpload);
router.get("/getAllUser", adminController.getAllUser);
router.get("/getSpecificUser/:id", adminController.getSpecificUser);
router.post(
  "/UpdateTheSpecificUser/:id",
  adminController.UpdateTheSpecificUser
);
router.get("/DeleteSpecificUser/:id", adminController.DeleteSpecificUser);
export default router;
