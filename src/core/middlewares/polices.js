import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Politicas de autorizacion
export const handlePolices = (polices) => (req, res, next) => {
    // Si es PUBLIC cualquiera puede entrar
    if( polices === "PUBLIC") {
        return next()
    }

    // Si no extraemos el token de los headers
    const authHeaders = req.headers.authorization;
    if(!authHeaders){
        return res.status(401).json({status: "error", msg: "Sin autorizacion"})
    }

    // Extraemos el jwt "Bearer <jwt>"
    const token = authHeaders.split(' ')[1];
    try {
        let user = jwt.verify(token, env.process.JWT_SECRET);
        let rol = user.role.toUpperCase();
        if(!polices.includes(rol)){
            return res.status(403).json({status: "error", msg: "sin acceso permitido"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({status: "error", msg: "error del servidor"})
    }
}