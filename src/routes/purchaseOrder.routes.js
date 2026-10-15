import { Router } from 'express';
import { getPurchaseOrders, getPurchaseOrder, createPurchaseOrder } from '../service/purchaseOrderService.js';


const router = Router();

router.get('/ordenes', getPurchaseOrders);
router.get('/ordenes/:id', getPurchaseOrder);
router.post('/ordenes', createPurchaseOrder);



export default router;
