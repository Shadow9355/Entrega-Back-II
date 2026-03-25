import productDao from '../dao/ProductDao.js';

class ProductRepository {
    constructor() {
        this.productDao = new productDao();
    }

    // Obtener productos
    async getProducts() {
        return await this.productDao.getProducts();
    }

    // Obtener un producto por id
    async getProductById(id) {
        return await this.productDao.getProductById(id);
    }

    // Crear nuevo producto
    async createProduct(productData) {
        return await this.productDao.createProduct(productData);
    }

    // Actualizar un producto
    async updateProduct(id, productData) {
        return await this.productDao.updateProduct(id, productData);
    }

    // Eliminar un producto
    async deleteProduct(id) {
        return await this.productDao.deleteProduct(id);
    }
}

export default ProductRepository;