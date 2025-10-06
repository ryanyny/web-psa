import express from "express"
import upload from "../../middlewares/upload.js"
import { addPartner, deletePartner, editPartner, getAllPartners, getPartnerById, getTotalPartners } from "../../controllers/landing/partnerController.js"

const router = express.Router()

router.get("/total", getTotalPartners)
router.get("/", getAllPartners)
router.get("/:id", getPartnerById)
router.post("/add", upload.single("image"), addPartner)
router.put("/edit/:id", upload.single("image"), editPartner)
router.delete("/:id", deletePartner)

export default router