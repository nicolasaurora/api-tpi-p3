import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../service/userService.js';


const router = Router();

router.get("/usuarios", getUsers);

router.get("/usuarios/:id", getUser);

router.post("/usuarios", createUser);

router.put("/usuarios/:id", updateUser);

router.delete("/usuarios/:id", deleteUser);



export default router;