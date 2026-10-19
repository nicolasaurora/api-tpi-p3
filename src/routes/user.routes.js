import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser, loginUser } from '../service/userService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/usuarios", verifyToken, verifyRole("superadmin", "admin"), getUsers);

router.get("/usuarios/:id", verifyToken, verifyRole("superadmin", "admin"), getUser);

router.post("/usuarios", createUser);

router.put("/usuarios/:id", verifyToken, verifyRole("superadmin"), updateUser);

router.delete("/usuarios/:id", verifyToken, verifyRole("superadmin"), deleteUser);

router.post("/login", loginUser);



export default router;