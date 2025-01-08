import { Router } from "express";
import {
  LoginUser,
  authStatus,
  authUser,
} from "../controller/user-mongoose-controller.js";
import { createUserValidationsSchema } from "../../utils/validatorSchema.js";
import { checkSchema } from "express-validator";
import passport from "passport";
const router = Router();

// Login user
router.post("/login", checkSchema(createUserValidationsSchema), LoginUser);
router.post("/auth", passport.authenticate("local"), authUser);
router.get("/status", authStatus);

export default router;
