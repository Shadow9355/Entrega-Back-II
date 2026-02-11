import User from "../models/userModel.js";

class UserManager{
    contructor() {}

    async getUsers() {
        try {
            const users = await User.find();
            return users;

        } catch (error) {
            console.log("No se encontraron usuarios", error);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            return user;

        } catch (error) {
            console.log("Usuario no encontrado", error);
        }
    }

    async createUser(newUser) {
        try {
            const user = User.create(newUser);
            return user;

        } catch (error) {
            console.log("No se pudo crear el usuario", error);
        }
    }

    async updateUser(id, updateData) {
        try {
            const update = await User.findByIdAndUpdate(id, updateData, { new: true });
            return update;

        } catch (error) {
            console.log("No se pudo actualizar el usuario", error);
        }
    }

    async deleteUser(id) {
        try {
            const deleteUser = await User.findByIdAndDelete(id);
            return deleteUser;

        } catch (error) {
            console.log("No se pudo eliminar el usuario", error);
        }
    }
}

export default UserManager;