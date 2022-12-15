import mongoose from "mongoose"
import {Schema, model} from 'mongoose'

interface payment{
    orderId:String,
    receiptId:String, 
    paymentId:String, 
    signature:String,
    amount:Number, 
    currency: String, 
    createdAt:Date,
    status:String
}

const paymentSchema = new Schema<payment>({
 orderId: {
    type: String,
 },
 receiptId: {
    type: String
 },
 paymentId: {
    type: String,
 },
 signature: {
    type: String,
 },
 amount: {
    type: Number
 },
 currency: {
    type: String
 },
 createdAt: {
    type: Date
 },
 status: {
    type: String
 }
})
const paymentModel = model<payment>('payment', paymentSchema)
export default paymentModel