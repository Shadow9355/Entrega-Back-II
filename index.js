import app from "./src/app.copy.js"; // despues cambiar a "./src/app.js"//
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(MONGO_URI).then(() => {
    console.log("Conectado a MongoDB");  
}).catch((error) => {
    console.log("No se conecto a la base de datos", error);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 15
    }),
    secret: SECRET_KEY,
    resave: true, 
    saveUninitialized: false
}));