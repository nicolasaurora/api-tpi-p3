import { Router } from 'express';
import { findProducts, findProduct, createProduct } from '../service/productService.js';


const router = Router();

router.get("/productos", findProducts);
router.get("/productos/:id", findProduct);
router.post("/productos", createProduct);




export default router;