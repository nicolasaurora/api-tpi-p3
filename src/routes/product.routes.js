import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../service/productService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/productos", getProducts);

router.get("/productos/:id", getProduct);

router.post("/productos",verifyToken,verifyRole("superadmin", "admin"), createProduct);

router.put("/productos/:id", verifyToken,verifyRole("superadmin", "admin"), updateProduct);

router.delete("/productos/:id", verifyToken,verifyRole("superadmin", "admin"), deleteProduct);



export default router;