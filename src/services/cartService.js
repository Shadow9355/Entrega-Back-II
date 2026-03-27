import cartRepository from '../repository/cartRepository.js';

class CartService {
    constructor() {
        this.cartRepository = new cartRepository();
    }

}

export default CartService;