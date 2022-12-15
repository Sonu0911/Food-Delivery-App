import express from "express";
import * as seller from "../controller/sellerController"
const router7 = express.Router();


router7.post("/businessCreate",seller.businessCreate)

export default router7;