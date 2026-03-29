import productRepository from '../repository/productRepository.js';

class ProductService {
    constructor() {
        this.productRepository = new productRepository();
    }

    // Crear nuevo producto
    async productCreate(productData) {
        return await this.productRepository.createProduct(productData);
    }

    // Actualizar un producto
    async productUpdate(id, productData) {
        return await this.productRepository.updateProduct(id, productData);
    }

    // Eliminar un producto
    async productDelete(id) {
        return await this.productRepository.deleteProduct(id);
    }
}

export default ProductService;