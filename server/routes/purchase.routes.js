import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
	createPurchase,
	fetchPurchase,
	generateSalesReport,
	getDashboardData,
	verifyPurchase,
} from "../controllers/purchase.controller.js";

const router = Router();

router.post("/addpuchase", createPurchase);
router.get("/verifypurchase/:id", verifyPurchase);
router.get("/fetchpurchases", generateSalesReport);
router.get("/fetchdashboarddata", getDashboardData);

export default router;
