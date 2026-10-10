import { Router } from 'express';
import { createUser, deleteUser, findUser, findUsers, updateUser } from '../service/userService.js';


const router = Router();

router.get("/usuarios", findUsers);

router.get("/usuarios/:id", findUser);

router.post("/usuarios", createUser);

router.put("/usuarios/:id", updateUser);

router.delete("/usuarios/:id", deleteUser);



export default router;