import UserRepository from "../repository/userRepository.js";
import CartRepository from "../repository/cartRepository.js";
import { createHash, isValidPassword } from "../core/utils/crypto.js";
import { CustomError } from "../core/errors/CustomError.js";

// Mailer
import jwt from "jsonwebtoken";
import transporter from "../core/config/mailer.js";

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


    // Enviar mail para restaurar contraseña
    async forgotPassword(email) {

        const user = await this.UserRepository.getUserByEmail(email);

        if (!user) {
            throw new CustomError("Usuario no encontrado", 404);
        }

        // generar token (expira en 1h)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const link = `http://localhost:8080/api/sessions/reset-password?token=${token}`;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Recuperación de contraseña entrega Back II",
            html: `
                <h2>Restablecer contraseña</h2>
                <p>Hacé click en el botón para cambiar tu contraseña:</p>
                <a href="${link}">
                    <button>Restablecer contraseña</button>
                </a>
            `
        });

        return { message: "Email enviado" };
    }

    // restaurar contraseña con el token recibido por mail
    async resetPassword(token, newPassword) {

        let decoded;

        
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new CustomError("Token inválido o expirado", 401);
        }
        
        const user = await this.UserRepository.getUserById(decoded.id);
        
        if (!user) {
            throw new CustomError("Usuario no encontrado", 404);
        }

        // validar que no sea la misma password
        if (isValidPassword(user.password, newPassword)) {
            throw new CustomError("No podés usar la misma contraseña", 400);
        }
        
        // hashear nueva password
        const hashedPassword = createHash(newPassword);

        const updatedUser = await this.UserRepository.updateUser(user._id, {
            password: hashedPassword
        });


        return updatedUser;
    }

}

export default UserService;