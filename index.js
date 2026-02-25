import app from "./src/app.js"; 
import dotenv from "dotenv";
import { DB } from "./src/core/config/mongoDB.js";

dotenv.config();

// Variable de entorno del Port
const PORT =  process.env.PORT;

// Servidor
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});

if(DB){
    console.log("Conectado a MongoDB")
}
else {
    console.log("No se pudo conectar a la base de datos")
}