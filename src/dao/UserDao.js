import User from "../models/userModel.js";

class UserDao {
    constructor() {}

    // Obtener usuarios
    async getUsers() {
        const users = await User.find();
        return users;
    }

    // Obtener un usuario por id
    async getUserById(id) {
        const user = await User.findById(id);
        return user;
    }

    // Obtener un usuario por email
    async getUserByEmail(email) {
        const user = await User.findOne({email: email});
        return user;
    }

    // Crear nuevo usuario
    async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }

    // Actualizar un usuario 
    async updateUser(id, userData) {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
    }

    // Eliminar un usuario
    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
}

export default UserDao; 