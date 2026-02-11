import { Router } from "express";
const router = Router();

import UserManager from "../../managers/userManager.js";
const userManager = new UserManager();


router.get("/", async(req,res) => {
    try {
        const users = await userManager.getUsers();
        res.status(200).json(users);

    } catch (error) {
        res.status(400).json({error:"Usuario no encontrado"});
    }
});

router.get("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const findUser = await userManager.getUserById(id);
        res.status(200).json(findUser);

    } catch (error) {
        res.status(400).json({error:"Usuario no encontrado"});
    }
});

router.post("/", async(req,res) => {
    try {
        const newUser = req.body;
        const addUser = await userManager.createUser(newUser);
        res.status(200).json(addUser);

    } catch (error) {
        res.status(500).json({error:"Error del servidor"});
    }
});

router.put("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedUser = await userManager.updateUser(id,updateData);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({error:"Error del servidor"});
    }
});

router.delete("/:id", async(req,res) => {
    try {
        const id = req.params.id;
        const deleteUser = await userManager.deleteUser(id);
        res.status(200).json(deleteUser);
        
    } catch (error) {
        res.status(500).json({error:"Error del servidor"});
    }
});


export default router;