import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import router from "./routes/ApiRoutes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser("cookieSecret"));
app.use(session());

app.use("/", router);

export default app;