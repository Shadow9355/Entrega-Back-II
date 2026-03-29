import { Router } from "express";
const router = Router();

// Passport.config
import { passportCall } from "../../core/middlewares/utils.js";

// Middewares de autorizacion
import authorize from "../../core/middlewares/authorize.js";

import CartController from "../../controllers/cartController.js";
const cartController = new CartController();


// Mostrar todos los carritos
router.get("/", cartController.getCarts);

// Mostrar un carrito por su id
router.get("/:id", cartController.getCartById);

// Crear un nuevo carrito
router.post("/", cartController.createCart);


// Agregar un nuevo producto al carrito
router.post("/product/:id",
    passportCall("jwt", {session: false}),
    authorize(["user"]),
    cartController.addProduct);


// Actualizar un carrito
router.put("/:id", cartController.updateCart);

// Eliminar un carrito
router.delete("/:id", cartController.deleteCart);


export default router;