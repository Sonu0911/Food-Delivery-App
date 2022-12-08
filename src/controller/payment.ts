import Razorpay from "razorpay" ;
import shortId from "shortid";
import crypto from "crypto";

// import PaymentDetail from "../models/payment"

const razorpay = new Razorpay({
    key_id: "rzp_test_IGkIdltAPqsemd",
    key_secret: "AuusyvH9HkNgxnx901LLazyi"
  });

export const Payment = async (req: any, res: any)=>{
 
    const options ={
        amount:req.body.amount,
        currency:"INR", 
        receipt: shortId.generate(),
        payment_capture: 1,
     }
     try{ 
      const response =await razorpay.orders.create(options)
      return res.status(200).send({status:true,msg:"created",data:response})
     }catch(err){
       console.log(err.message);
     }
}

export const paymentCapture = async (req:any, res: any) => {
    try{
        console.log(JSON.stringify(req.body))
        const receivedSignature = req.headers['x-razorpay-signature']
        console.log(receivedSignature);
        
         // const body=req.body.razorpay_order_id+ "|" +req.body.razorpay_payment_id;
        var expectedSignature = crypto.createHmac('sha256','12345678')
        expectedSignature.update(JSON.stringify(req.body))
        const digest = expectedSignature.digest('hex')
         // console.log("sig "+req.body.razorpay_signature);
         // console.log(expectedSignature);
            console.log(digest,receivedSignature)
        if(digest === receivedSignature){
            console.log("Payment Success");
            return res.status(200).send({status:true,msg:"success"})
          
        }else{
           console.log("Payment Fail");
          return res.status(400).send({status:false,msg:"failed"})
        }
    
    }catch(err){
        console.log(err.message)
    }

}
      