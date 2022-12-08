import express from 'express';
import * as orderController  from '../controller/orderController'
const router=express.Router();
import * as payment from "../controller/payment"

router.post("/createOrder",orderController.createOrder)
router.get("/getOrder/:orderId",orderController.getOrderById)
router.get("/getOrderWithUserId/:userId",orderController.getUserOrders)


router.post("/payment",payment.Payment)
router.post("/paymentCapture", payment.paymentCapture)

export default router;
