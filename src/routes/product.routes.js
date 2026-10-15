import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../service/productService.js';


const router = Router();

router.get("/productos", getProducts);

router.get("/productos/:id", getProduct);

router.post("/productos", createProduct);

router.put("/productos/:id", updateProduct);

router.delete("/productos/:id", deleteProduct);



export default router;