import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser, loginUser, updateUserRole } from '../service/userService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/users", verifyToken, verifyRole("superadmin", "admin"), getUsers);

router.get("/users/:id", verifyToken, verifyRole("superadmin", "admin"), getUser);

router.post("/users", createUser);

router.put("/users/:id", verifyToken, verifyRole("superadmin"), updateUser);

router.delete("/users/:id", verifyToken, verifyRole("superadmin"), deleteUser);

router.post("/login", loginUser);

router.patch("/users/:id/role", verifyToken, verifyRole("superadmin"), updateUserRole);



export default router;
