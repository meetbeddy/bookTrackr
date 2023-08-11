import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	createPurchase,
	fetchPurchase,
	generateSalesReport,
	verifyPurchase,
} from "../controllers/purchase.controller.js";

const router = Router();

router.post("/addpuchase", createPurchase);
router.get("/verifypurchase/:id", verifyPurchase);
router.get("/fetchpurchases", generateSalesReport);

export default router;
