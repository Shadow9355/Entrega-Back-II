import CartDao from '../dao/CartDao.js';

class CartRepository {
    constructor() {
        this.cartDao = new CartDao();
    }

    // Obtener carritos
    async getCarts() {
        return await this.cartDao.getCarts();
    }

    // Obtener un carrito por id
    async getCartById(id) {
        return await this.cartDao.getCartById(id);
    }

    // Crear nuevo carrito
    async createCart(cartData) {
        return await this.cartDao.createCart(cartData);
    }

    // Actualizar un carrito
    async updateCart(id, cartData) {
        return await this.cartDao.updateCart(id, cartData);
    }

    // Eliminar un carrito
    async deleteCart(id) {
        return await this.cartDao.deleteCart(id);
    }
}

export default CartRepository;