import express from "express";
import {
  getTotalPrograms,
  getAllPrograms,
  getProgramById,
  addProgram,
  editProgram,
  deleteProgram,
} from "../../controllers/landing/programController.js";
import upload from "../../middlewares/upload.js"

const router = express.Router();

// routes
router.get("/total", getTotalPrograms);
router.get("/", getAllPrograms);
router.get("/:id", getProgramById);
router.post("/add", upload.single("image"), addProgram);
router.put("/edit/:id", upload.single("image"), editProgram);
router.delete("/:id", deleteProgram);

export default router;
