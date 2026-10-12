import { Router } from 'express';
import { findProducts, findProduct, createProduct, updateProduct, deleteProduct } from '../service/productService.js';


const router = Router();

router.get("/productos", findProducts);

router.get("/productos/:id", findProduct);

router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

router.delete("productos/:id", deleteProduct);



export default router;