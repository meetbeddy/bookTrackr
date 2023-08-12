import { Router } from "express";
import {
	createtextbook,
	createuser,
	deleteuser,
	fetchusers,
	fetchTextbooks,
	deletetextbook,
} from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/createuser", auth, createuser);
router.get("/getusers", auth, fetchusers);
router.delete("/deleteuser/:id", auth, deleteuser);
router.post("/createtextbook", auth, createtextbook);
router.get("/gettextbook", auth, fetchTextbooks);
router.delete("/deletetextbook/:id", auth, deletetextbook);

export default router;
