import express from "express";
import {
  getTotalParticipants,
  getAllParticipants,
  addParticipant,
  editParticipantStatus,
  deleteParticipant,
} from "../../controllers/landing/participantController.js";

const router = express.Router();

router.get("/total", getTotalParticipants);
router.get("/", getAllParticipants);
router.post("/add", addParticipant);
router.put("/edit/:id", editParticipantStatus);
router.delete("/:id", deleteParticipant);

export default router;