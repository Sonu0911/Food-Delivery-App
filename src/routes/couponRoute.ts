import express from "express";
const router = express.Router();
import * as coupon from "../controller/couponController";

router.post("/addCouponCodeDiscount",coupon.addCouponCodeDiscount)
router.post("/applyCoupon/:couponId",coupon.applyCoupon)


export default router