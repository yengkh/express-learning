import { Router } from "express";
import userRouter from "./user-router.js";
import productRouter from "./product-router.js";
import userMongooseRouter from "./user-mongoose-router.js";
const router = Router();

router.use("/api/user", userMongooseRouter);
router.use("/api/product", productRouter);
export default router;
