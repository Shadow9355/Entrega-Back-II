import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import app from "../../app.js";


dotenv.config();

// Variables de entorno
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

// Conexion con la base de datos
export const DB = mongoose.connect(MONGO_URI);

// Sesiones conectadas a la base de datos
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 15
    }),
    secret: SECRET_KEY,
    resave: true, 
    saveUninitialized: false
}));

