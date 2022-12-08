// import mongoose from "mongoose"
// import {Schema, model} from 'mongoose'

// interface payment{
//     orderId:string,
//     receiptId:string, 
//     paymentId:string, 
//     signature:string,
//     amount:number, 
//     currency: string, 
//     createdAt:Date,
//     status:string
// }

// const paymentSchema = new Schema<payment>({
//     orderId: {
//     type: String,
//     required: true
//  },
//  receiptId: {
//     type: String
//  },
//  paymentId: {
//     type: String,
//  },
//  signature: {
//     type: String,
//  },
//  amount: {
//     type: Number
//  },
//  currency: {
//     type: String
//  },
//  createdAt: {
//     type: Date
//  },
//  status: {
//     type: String
//  }
// })
// const paymentModel = model<payment>('payment', paymentSchema)
// export default paymentModel