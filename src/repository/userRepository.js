import UserDao from '../dao/UserDao.js';

class UserRepository {
    constructor() {
        this.userDao = new UserDao();
    }

    // Obtener usuarios
    async getUsers() {
        return await this.userDao.getUsers();
    }

    // Obtener un usuario por id
    async getUserById(id) {
        return await this.userDao.getUserById(id);
    }

    // Obtener un usuario por email
    async getUserByEmail(email) {
        return await this.userDao.getUserByEmail(email);
    }

    // Crear nuevo usuario
    async createUser({first_name, last_name, email, age, password: hashed, role, cart}) {
        return await this.userDao.createUser({first_name, last_name, email, age, password: hashed, role, cart});
    }

    // Actualizar un usuario
    async updateUser(id, userData) {
        return await this.userDao.updateUser(id, userData);
    }

    // Eliminar un usuario
    async deleteUser(id) {
        return await this.userDao.deleteUser(id);
    }
}

export default UserRepository;