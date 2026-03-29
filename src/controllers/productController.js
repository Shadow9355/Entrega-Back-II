import ProductService from "../services/productService.js";
import ProductRepository from "../repository/productRepository.js";

class ProductController {
    constructor(){
        this.productService = new ProductService();
        this.productRepository = new ProductRepository();
    }


    getProducts = async (req, res) => {
    try {
      const products = await this.productRepository.getProducts();
      res.status(200).json(products);

    } catch (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

  getProductById = async (req, res) => {
    try {
      const product = await this.productRepository.getProductById(req.params.id);
      
      res.status(200).json(product);
    } catch (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

  createProduct = async (req, res) => {
    try {
      const product = await this.productService.productCreate(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

  updateProduct = async (req, res) => {
    try {
      const product = await this.productService.productUpdate(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

  deleteProduct =async (req, res) => {
    try {
      const product = await this.productService.productDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      res.status(error.statusCode || 500).json({error: error.message});
    }
  }

};

export default ProductController;