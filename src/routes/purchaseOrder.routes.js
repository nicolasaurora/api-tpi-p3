import { Router } from 'express';
import { getPurchaseOrders, getPurchaseOrder, createPurchaseOrder, getMyPurchaseOrders } from '../service/purchaseOrderService.js';
import { verifyToken, verifyRole } from "../middleware/authMiddleware.js";


const router = Router();

router.get('/ordenes', verifyToken, verifyRole("superadmin", "admin"), getPurchaseOrders);

router.get('/ordenes/mis-ordenes', verifyToken, getMyPurchaseOrders);

router.get('/ordenes/:id', verifyToken, getPurchaseOrder);

router.post('/ordenes', verifyToken, createPurchaseOrder);



export default router;
