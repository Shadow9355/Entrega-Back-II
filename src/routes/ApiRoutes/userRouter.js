import { Router } from "express";
const router = Router();

// Passport.config
import { passportCall } from "../../core/middlewares/utils.js";
import jwt from "jsonwebtoken";

// Manager: contiene la logica
import UserManager from "../../managers/userManager.js";
const userManager = new UserManager();


// Mostrar todos los usuarios
router.get("/", async(req,res) => {
    try {
        const users = await userManager.getUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
});

// Mostrar current
router.get("/current", passportCall("jwt", {session: false}), (req,res) => {
    
    res.status(200).json({
        payload:{
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Mostrar un usuario por su id
router.get("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const findUser = await userManager.getUserById(id);
        res.status(200).json(findUser);

    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
});


// Llama a passport para crear un nuevo usuario y registrarlo
router.post("/register", passportCall("register"), (req, res) => {

    return res.status(201).json({
        payload:{
            message: "Usuario registrado con éxito",
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        }
    });
});

// Loguear un usuario ya registrado
router.post("/login", passportCall("login"), (req, res) => {

    const payload = {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.role
        }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
    return res.status(200).json({
        message: "Usuario logueado correctamente",
        token
    });
});

// Restaurar contraseña
router.post("/restaurar", async(req,res) => {
    try {
        const {email, password} = req.body;
        const restaured = await userManager.restaurarPassword(email, password);
        res.status(200).json({ message: "Contraseña restaurada", payload: restaured})

    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message || "No se pudo actualizar la contraseña"});
    }
});

// Actualizar la data de un usuario
router.put("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedUser = await userManager.updateUser(id,updateData);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
});

// Eliminar un usuario
router.delete("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const deleteUser = await userManager.deleteUser(id);
        res.status(200).json(deleteUser);
        
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
});


export default router;