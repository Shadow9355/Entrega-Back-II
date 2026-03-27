import UserRepository from "../repository/userRepository";
import { createHash, isValidPassword } from "../core/utils/crypto.js";
import { CustomError } from "../core/errors/CustomError.js";

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    // crear un usuario y registrarlo
    async userCreate({first_name, last_name, email, age, password, cart, role}) {

        // validaciones de campos
        if(!first_name || !last_name || !email || !age || !password){
            throw new CustomError("Campos incompletos", 400);
        }

        // hasheo de contraseña
        const hashed = createHash(password)    

        // validacion de existencia de email previa
        const exists = await this.UserRepository.getUserByEmail(email);
        if (exists) {
            throw new CustomError("Error el usuario ya existe", 400);
        }

        // Creamos el usuario
        const user = await this.UserRepository.createUser({first_name, last_name, email, age, password: hashed, cart, role});

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
    
            if(!user){
                throw new CustomError("Usuario invalido", 401);
            }
    
            user.password = createHash(password);
    
            const result = await this.UserRepository.updateUser({id: user._id, userData: user});
            return result;
    }
}

export default UserService;