import UserService from "../services/userService";
import UserRepository from "../repository/userRepository";

// JWT
import jwt from "jsonwebtoken";

// Variable de entorno para JWT
import dotenv from "dotenv";
dotenv.config();


class UserController {
    constructor() {
        this.UserService = new UserService();
        this.UserRepository = new UserRepository();
    }

    // Obtener usuarios
    getUsers = async (req, res) => {
        try {
            const users = await this.UserRepository.getUsers();
            res.status(200).json(users);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Obtener usuario por id
    getUserById = async (req, res) => {
        try {
            const id = req.params.id;
            const findUser = await this.UserRepository.getUserById(id);
            res.status(200).json(findUser);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Crear nuevo usuario y registrarlo
    createAndRegisterUser = async (req, res) => {
        try {
            const {first_name, last_name, email, age, password, cart, role} = req.body;
            const user = await this.UserService.userCreate({first_name, last_name, email, age, password, cart, role}); 
            return res.status(201).json({
                payload:{
                    message: "Usuario registrado con éxito",
                    id: req.user._id,
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email
                }
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

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Restaurar contraseña
    restorePassword = async (req, res) => {
        try {
            const {email, password} = req.body;
            const result = await this.UserService.restorePassword(email, password);
            res.status(200).json(result);

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

            res.status(200).json(updatedUser);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

    // Eliminar un usuario
    deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const deleteUser = await this.UserRepository.deleteUser(id);
            res.status(200).json(deleteUser);
            
        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    }

}

export default UserController;