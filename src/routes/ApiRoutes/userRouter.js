import { Router } from "express";
const router = Router();

// Passport.config
import { passportCall } from "../../core/middlewares/utils.js";

// Controller: contiene las respuestas http, lgica y conexion a DB (heredado de sus capas)
import UserController from "../../controllers/userController.js";
const userController = new UserController();


// Mostrar todos los usuarios
router.get("/", userController.getUsers);


// Mostrar ruta current solo accesible para usuarios logueados
router.get("/current", passportCall("jwt", {session: false}), userController.current);


// Mostrar un usuario por su id
router.get("/:id", userController.getUserById);


// Crear un nuevo usuario y registrarlo
router.post("/register", userController.createAndRegisterUser);


// Loguear un usuario ya registrado
router.post("/login", userController.loginUser);


// Restaurar contraseña
router.post("/restore", userController.restorePassword);


// Actualizar un usuario
router.put("/:id", userController.updateUser);


// Eliminar un usuario
router.delete("/:id", userController.deleteUser);


export default router;