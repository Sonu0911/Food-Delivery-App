import Order from "../models/orderModel"
import  user from "../models/userModel"
import * as val from '../validation/validation'



export const createOrder = async (req, res) => {
 try{
    let data=req.body
    const userId=req.body.userId
    var {orderItems,qty,price,coupon,totalPrice,deliveryCharge,packingCharge,totalPrice} = data
 
    if(!val.isValidObjectId(userId)){
        return res.status(400).send({status:false,msg:"please provide valid id"})
    }
    if (orderItems && orderItems.length === 0) {
        return res.status(404).send({status:false,msg:"no items found"})
    }  
     totalPrice = qty*price
     totalPrice = totalPrice + deliveryCharge + packingCharge;
     //const finalData={finalPrice:finalPrice}
     
     const createdOrder = await Order.create(data)
     return res.status(201).send({status:true,data:createdOrder})
  }catch(err){
    return res.status(500).send({status:false, message:err.message})
  }
}


export const getOrderById=async (req, res) => {
    try{ 
      let orderId=req.params.orderId;

      const findOrder=await Order.findOne({_id: orderId},{isDeleted:false});
      if(!findOrder){
        return res.status(404).send({status:false, message:"order not found"})
      }
        return res.status(200).send({status:true,msg :"order fetch successfully",data:findOrder})

     }catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

export const getUserOrders=async (req, res) => {
    try{
      const userId=req.params.userId
      if(!val.isValidObjectId){
        return res.status(400).send({status:false,msg:"please provide correct id"})
      }
      const findUser = await user.findOne({_id:userId},{isDeleted:false})
      if(!findUser){
        return res.status(404).send({status:false, message:"user not found"})
      }
      
      const findOrder = await Order.findOne({userId:userId})
      if(!findOrder){
        return res.status(404).send({status:false, message:"order not found"})
      }
      return res.status(200).send({status:true, message:"orders", data:findOrder})
    }catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}
