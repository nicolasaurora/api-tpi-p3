import { Router } from 'express';
import { getPurchaseOrders, getPurchaseOrder, createPurchaseOrder, getMyPurchaseOrders } from '../service/purchaseOrderService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";


const router = Router();

router.get('/orders', verifyToken, verifyRole("superadmin", "admin"), getPurchaseOrders);

router.get('/orders/my-orders', verifyToken, getMyPurchaseOrders);

router.get('/orders/:id', verifyToken, getPurchaseOrder);

router.post('/orders', verifyToken, createPurchaseOrder);



export default router;
