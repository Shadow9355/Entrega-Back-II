import UserService from "../services/userService.js";
import UserRepository from "../repository/userRepository.js";
import CartRepository from "../repository/cartRepository.js";
import UserDTO from "../dto/UserDTO.js";

// JWT
import jwt from "jsonwebtoken";

// Variable de entorno para JWT
import dotenv from "dotenv";
dotenv.config();


class UserController {
    constructor() {
        this.UserService = new UserService();
        this.UserRepository = new UserRepository();
        this.CartRepository = new CartRepository();
    }

    // Obtener usuarios
    getUsers = async (req, res) => {
        try {
            const users = await this.UserRepository.getUsers();

            const result = users.map(user => ({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role
            }));

            res.status(200).json({payload: result});

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Obtener usuario por id
    getUserById = async (req, res) => {
        try {
            const id = req.params.id;
            const findUser = await this.UserRepository.getUserById(id);

            res.status(200).json({ 
                payload: new UserDTO(findUser)
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Acceder a una ruta protegida por JWT
    current = async (req, res) => {
        try {
            res.status(200).json({
                message: "Acceso a ruta protegida exitoso", 
                payload: new UserDTO(req.user)
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Crear nuevo usuario y registrarlo
    createAndRegisterUser = async (req, res) => {
        try {
            const {first_name, last_name, email, age, password, role} = req.body;

            // crear un carrito para el usuario
            const cart = await this.CartRepository.createCart();

            const user = await this.UserService.userCreate({first_name, last_name, email, age, password, role, cart: cart._id}); 
            
            return res.status(201).json({
                message: "Usuario registrado con éxito",
                payload: new UserDTO(user)
            });
            
        }   catch (error) {
                res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Loguear un usuario ya registrado
    loginUser = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await this.UserService.loginUser({email, password});
            
            const payload = {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role
                    }
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
            return res.status(200).json({
                message: "Usuario logueado correctamente",
                token
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }


    // Restaurar contraseña
    restorePassword = async (req, res) => {
        try {
            const {email, password} = req.body;
            const result = await this.UserService.restorePassword(email, password);

            res.status(200).json({message: "Contraseña actualizada con éxito", 
                payload: new UserDTO(result)
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Actualizar un usuario
    updateUser = async (req, res) => {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedUser = await this.UserRepository.updateUser(id, updateData);

            res.status(200).json({message: "Usuario actualizado con exito", 
                payload: new UserDTO(updatedUser)
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Eliminar un usuario
    deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const deleteUser = await this.UserRepository.deleteUser(id);

            res.status(200).json({message: "Usuario eliminado con exito", 
                payload: new UserDTO(deleteUser)
            });
            
        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

}

export default UserController;