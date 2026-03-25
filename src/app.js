import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/ApiRoutes/index.js";
import passport from "passport";
import initializePassport from "./core/config/passport.config.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({origin: "http://localhost:8080"}));

app.use(cookieParser(process.env.JWT_SECRET));
initializePassport();
app.use(passport.initialize());


app.use("/", router);

export default app;