import express from "express";
const router = express.Router();

import userRouter from "./userRouter.js";


router.use("/api/sessions", userRouter);

export default router;