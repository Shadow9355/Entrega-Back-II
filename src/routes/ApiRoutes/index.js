import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";


router.use("/api/sessions", userRouter);
router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);

export default router;