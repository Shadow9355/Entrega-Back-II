import CartService from "../services/cartService.js";
import CartRepository from "../repository/cartRepository.js";
import TicketService from "../services/ticketService.js";

class CartController {
    constructor() {
        this.cartService = new CartService();
        this.cartRepository = new CartRepository();
        this.ticketService = new TicketService();
    }

    // Obtener los carritos
    getCarts = async (req, res) => {
        try {
            const carts = await this.cartRepository.getCarts();
            res.json(carts);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

    // Obtener un carrito por id
    getCartById = async (req, res) => {
        try {
            const cart = await this.cartRepository.getCartById(req.params.id);
            if (!cart) {
                return res.status(404).json({ error: "Carrito no encontrado" });
            }

            res.json(cart);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

    // Crear un nuevo carrito
    createCart = async (req, res) => {
        try {
            const newCart = await this.cartRepository.createCart(req.body);
            res.status(201).json(newCart);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

    // Agregar un producto al carrito
    addProduct = async (req, res) => {
        try {
            const cartId = req.user.cart;
            const productId = req.params.id;
            const updatedCart = await this.cartService.addProduct(cartId, productId);
            
            res.json(updatedCart);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

    // Actualizar un carrito
    updateCart = async (req, res) => {
        try {
            const updatedCart = await this.cartRepository.updateCart(req.params.id, req.body);
            res.json(updatedCart);

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

    // Eliminar un carrito
    deleteCart = async (req, res) => {
        try {
            await this.cartRepository.deleteCart(req.params.id);
            res.json({ message: "Carrito eliminado exitosamente" });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
        
    };


    // Comprar los productos del carrito
    purchaseCart = async (req, res) => {
        try {

            const cartId = req.user.cart;
            const userEmail = req.user.email;
    
            const result = await this.ticketService.purchase(cartId, userEmail);
    
            res.status(200).json({
                message: "Compra procesada con exito",
                ticket: result.ticket,
                productos_no_procesados: result.notProcessedProducts
            });

        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    };

}

export default CartController;