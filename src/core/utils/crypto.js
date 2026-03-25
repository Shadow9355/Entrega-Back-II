import bcrypt from "bcrypt";

// Hashear una contraseña
export const createHash = (password) => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

// Comparar una contraseña sin hashear con su versión hasheada
export const isValidPassword = (plainPassword, hashedPassword)  => {
    return bcrypt.compareSync(plainPassword, hashedPassword); 
}