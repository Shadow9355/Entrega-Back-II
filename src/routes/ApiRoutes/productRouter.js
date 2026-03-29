import { Router } from "express";
const router = Router();

// Passport.config
import { passportCall } from "../../core/middlewares/utils.js";

// middlewares de autorizacion
import authorize from "../../core/middlewares/authorize.js";

// Controller: contiene las respuestas http, lgica y conexion a DB (heredado de sus capas)
import ProductController from "../../controllers/productController.js";
const productController = new ProductController();


// Mostrar todos los productos
router.get("/", productController.getProducts);

// Mostrar un producto por su id
router.get("/:id", productController.getProductById);


// Crear un nuevo producto
router.post("/", 
    passportCall("jwt", {session: false}), 
    authorize(["admin"]), 
    productController.createProduct);


// Actualizar un producto
router.put("/:id", 
    passportCall("jwt", {session: false}), 
    authorize(["admin"]), 
    productController.updateProduct);


// Eliminar un producto
router.delete("/:id", 
    passportCall("jwt", {session: false}), 
    authorize(["admin"]), 
    productController.deleteProduct);


export default router;