import { Router } from "express";
import { createuser, fetchusers } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/createuser", auth, createuser);
router.get("/getusers", auth, fetchusers);

export default router;
