import mongoose from "mongoose"
import {Schema, model} from 'mongoose'

interface order{
  userId:String;
    orderItems:[
        {name:string},
        {qty:Number},
        {image:string},
        {price:Number},
        ];
        shippingAddress:{
          address:String,
          city:String,
          pincode:Number
        };
        deliveryCharge:Number;
        packingCharge:Number
        mobile:Number;
        totalPrice:Number;
        coupon:String,
        isDelivered:Boolean;
        deliveredAt:Date;
        status:String;
        orders:String
}

const orderSchema = new Schema<order>({
     userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty:  { type: Number, required: true },
        image:{ type: String, required: true },
        price:{ type: Number, required: true },
        food: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "food",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city:    { type: String, required: true },
      pincode: { type: Number, required: true }
    },
    deliveryCharge: {
      type: Number,
      default: 0.0,
    },
    packingCharge:{
       type: Number,
       required:true
    },
    mobile: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    coupon:{
      type: Number,
      default:0
    },
    status:{
      type: String,
      default :"pending"
    },
    orders:
     []
  },
 
  {
    timestamps: true,
  }
)
const OrderModel = model<order>('Order', orderSchema)
export default OrderModel
