import { Router } from "express";
import { createuser } from "../controllers/admin.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/createuser", auth, createuser);

export default router;
