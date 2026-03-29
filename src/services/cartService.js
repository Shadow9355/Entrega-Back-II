import CartRepository from '../repository/cartRepository.js';

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    // Agregar un producto al carrito
    async addProduct(cartId, productId) {
        const cart = await this.cartRepository.getCartById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
    
        const existingProduct = cart.products.find(
            p => p.product && p.product.toString() === productId );
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

    await cart.save();

    return cart;    
    }

}

export default CartService;