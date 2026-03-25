import Cart from "../models/cartModel.js";

class CartDao {
    constructor() {}

    // Obtener carritos
    async getCarts() {
        const carts = await Cart.find();
        return carts;
    }

    // Obtener un carrito por id
    async getCartById(id) {
        const cart = await Cart.findById(id);
        return cart;
    }

    // Crear nuevo carrito
    async createCart(cartData) {
        const cart = await Cart.create(cartData);
        return cart;
    }

    // Actualizar un carrito
    async updateCart(id, cartData) {
        const updatedCart = await Cart.findByIdAndUpdate(id, cartData, { new: true });
        return updatedCart;
    }

    // Eliminar un carrito
    async deleteCart(id) {
        const deletedCart = await Cart.findByIdAndDelete(id);
        return deletedCart;
    }

}

export default CartDao;