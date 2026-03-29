import UserRepository from "../repository/userRepository.js";
import CartRepository from "../repository/cartRepository.js";
import { createHash, isValidPassword } from "../core/utils/crypto.js";
import { CustomError } from "../core/errors/CustomError.js";

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
        this.CartRepository = new CartRepository();
    }


    // crear un usuario y registrarlo
    async userCreate({first_name, last_name, email, age, password, role, cart}) {

        // validaciones de campos
        if(!first_name || !last_name || !email || !age || !password){
            throw new CustomError("Campos incompletos", 400);
        }
        
        // validacion de existencia de email previa
        const exists = await this.UserRepository.getUserByEmail(email);
        if (exists) {
            throw new CustomError("Error: el usuario ya existe", 400);
        }
        
        // hasheo de contraseña
        const hashed = createHash(password)    

        // Creamos el usuario
        const user = await this.UserRepository.createUser({first_name, last_name, email, age, password: hashed, role, cart});

        return user;
    }

    // loguar un usuario ya registrado
    async loginUser({email, password}) {

        // validacion de campos
        if(!email || !password){
            throw new CustomError("Campos incompletos", 400);
        }
        
        // validacion de existencia de email previa
        const user = await this.UserRepository.getUserByEmail(email);
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

    // restaurar contraseña
    async restorePassword(email, password) {
            // buscar el usuario por email
            const user = await this.UserRepository.getUserByEmail(email);
    
            // validar que el usuario exista
            if(!user){
                throw new CustomError("Usuario invalido", 401);
            }
    
            // hashear la contraseña nueva
            const heashedPassword = createHash(password);
    
            const result = await this.UserRepository.updateUser(user._id, {password: heashedPassword});

            return result;
    }
}

export default UserService;