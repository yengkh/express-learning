import { Router } from "express";
import { LoginUser } from "../controller/user-mongoose-controller.js";
const router = Router();

// Login user
router.post("/login", LoginUser);

export default router;
