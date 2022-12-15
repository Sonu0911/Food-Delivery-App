import Razorpay from "razorpay" ;
import shortId from "shortid";
import crypto from "crypto";
import order from "../models/orderModel"
import dotenv from "dotenv"
// import payment from "../models/payment"

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.KEYID,
  key_secret: process.env.KEYSECRET,
});
export const Payment = async (req:any, res: any)=>{
      try{ 
      const orderId = req.params.orderId;
      const findOrder = await order.findOne({_id:orderId},{isDeleted: false});
      if(!findOrder){
        return res.status(404).send({status:false,msg:"order not found"})
      }
      
      const options ={
        amount:findOrder.totalPrice,
        currency:"INR", 
        receipt: shortId.generate(),
        payment_capture: 1,
      }
      const response = await razorpay.orders.create(options)
      return res.status(201).send({status:true,msg:"payment order created successfully",
      data:{
        id:response.id,
        amount:response.amount,
        currency:response.currency,
        receipt:response.receipt,
        orderId:findOrder._id,
      }})
      
     }catch(err){
      console.log(err.message);
     }
}

export const paymentCapture = async (req:any, res:any) => {
    try{
         const {order_id, payment_id} = req.body;     
         const razorpay_signature =  req.headers['x-razorpay-signature'];
        
          // const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
          let hmac = crypto.createHmac('sha256', 'key_secret');      
           hmac.update(order_id + "|" + payment_id);
          const generated_signature = hmac.digest('hex');
          
          if(razorpay_signature === generated_signature){
           res.json({success:true, message:"Payment has been verified"})
          }
          else
           res.json({success:false, message:"Payment verification failed"})
    
    }catch(err){
        console.log(err.message)
    }

}
      