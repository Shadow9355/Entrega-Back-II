import productRepository from '../repository/productRepository.js';

class ProductService {
    constructor() {
        this.productRepository = new productRepository();
    }

}

export default ProductService;