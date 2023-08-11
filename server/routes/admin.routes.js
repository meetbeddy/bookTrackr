import { Router } from "express";
import {
	createtextbok,
	createuser,
	deleteuser,
	fetchusers,
} from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/createuser", auth, createuser);
router.get("/getusers", auth, fetchusers);
router.delete("/deleteuser/:id", auth, deleteuser);
router.post("/createtextbook", auth, createtextbok);
export default router;
