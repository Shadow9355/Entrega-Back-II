import User from "../models/userModel.js";
import { createHash, isValidPassword } from "../core/utils/crypto.js";
import { CustomError } from "../core/errors/CustomError.js";


class UserManager{
    contructor() {}

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

    // Crear nuevo usuario y registrarlo
    async createUser({first_name, last_name, email, age, password, cart, role}) {

        // validaciones de campos
        if(!first_name || !last_name || !email || !age || !password){
            throw new CustomError("Campos incompletos", 400);
        }

        // hasheo de contraseña
        const hashed = createHash(password)    

        // validacion de existencia de email previa
        const exists = await User.findOne({ email });
        if (exists) {
            throw new CustomError("Error el usuario ya existe", 400);
        }

        // Creamos el usuario
        const user = await User.create({first_name, last_name, email, age, password: hashed, cart, role});

        return user;
    }

    // Loguear un usuario ya registrado
    async loginUser({email, password}) {

        // validacion de campos
        if(!email || !password){
            throw new CustomError("Campos incompletos", 400);
        }
        
        // validacion de existencia de email previa
        const user = await User.findOne({ email });
        if(!user){
            throw new CustomError("El email es invalido", 401)
        }
        
        // validacion de contraseña
        const ok = isValidPassword(password, user.password);
        if(!ok){
            throw new CustomError("La contraseña es invalida", 401)
        }
        
        return user;
    }

    // Actualizar un usuario
    async updateUser(id, updateData) {
        const update = await User.findByIdAndUpdate(id, updateData, { new: true });
        return update;
    }

    // Eliminar un usuario
    async deleteUser(id) {
        const deleteUser = await User.findByIdAndDelete(id);
        return deleteUser;
    }

    // Restaurar contraseña
    async restaurarPassword(email, password) {
        const user = await User.findOne({email});

        if(!user){
            throw new CustomError("Usuario invalido", 401);
        }

        user.password = await createHash(password);

        const result = await User.updateOne(user);
        return result;
    }
}


export default UserManager;