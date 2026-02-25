import bcrypt from "bcrypt";

// Hashear una contraseña
export const createHash = async(password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Comparar una contraseña sin hashear con su versión hasheada
export const isValidPassword = async(plainPassword, hashedPassword)  => {
    return bcrypt.compare(plainPassword, hashedPassword); 
}