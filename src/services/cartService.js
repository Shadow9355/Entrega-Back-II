import CartRepository from '../repository/cartRepository.js';

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    // Agregar un producto al carrito
    async addProduct(cartId, productId) {
        return await this.cartRepository.addProduct(cartId, productId);
    }

}

export default CartService;