import Product from "../models/productModel.js";

class ProductDao {
    constructor() {}

    // Obtener productos
    async getProducts() {
        const products = await Product.find();
        return products;
    }

    // Obtener un producto por id
    async getProductById(id) {
        const product = await Product.findById(id);
        return product;
    }

    // Crear nuevo producto
    async createProduct(productData) {
        const product = await Product.create(productData);
        return product;
    }

    // Actualizar un producto
    async updateProduct(id, productData) {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        return updatedProduct;
    }

    // Eliminar un producto
    async deleteProduct(id) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;
    }

}

export default ProductDao;