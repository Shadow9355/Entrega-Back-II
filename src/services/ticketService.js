import TicketRepository from "../repository/ticketRepository.js";
import CartRepository from "../repository/cartRepository.js";
import ProductRepository from "../repository/productRepository.js";

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository();
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async purchase(cartId, userEmail) {

        const cart = await this.cartRepository.getCartById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        let totalAmount = 0;
        let purchasedProducts = [];
        let remainingProducts = [];

        // recorrer productos del carrito
        for (const item of cart.products) {

            const product = await this.productRepository.getProductById(item.product);

            // si hay stock suficiente
            if (product.stock >= item.quantity) {

                // descontar stock
                product.stock -= item.quantity;
                await product.save();

                // agregar a compra
                purchasedProducts.push(item);

                // sumar total
                totalAmount += product.price * item.quantity;

            } 
            
            // si no hay stock se queda en carrito
            else {
                remainingProducts.push(item);
            }
        }

        // crea el ticket solo con productos comprados
        let ticket = null;

        if (purchasedProducts.length > 0) {
            ticket = await this.ticketRepository.createTicket({
                purchaser: userEmail,
                amount: totalAmount,
                products: purchasedProducts
            });
        }

        // actualiza el carrito
        cart.products = remainingProducts;
        await cart.save();

        return {
            ticket,
            notProcessedProducts: remainingProducts
        };
    }

}

export default TicketService;