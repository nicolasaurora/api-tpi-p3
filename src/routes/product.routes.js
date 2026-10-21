import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../service/productService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products", verifyToken, verifyRole("superadmin", "admin"), createProduct);

router.put("/products/:id", verifyToken, verifyRole("superadmin", "admin"), updateProduct);

router.delete("/products/:id", verifyToken, verifyRole("superadmin", "admin"), deleteProduct);



export default router;
