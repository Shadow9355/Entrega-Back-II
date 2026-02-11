import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";


router.use("/api/user", userRouter);

export default router;