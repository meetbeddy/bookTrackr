import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	createPurchase,
	verifyPurchase,
} from "../controllers/purchase.controller.js";

const router = Router();

router.post("/addpuchase", createPurchase);
router.get("/verifypurchase/:id", verifyPurchase);

export default router;
