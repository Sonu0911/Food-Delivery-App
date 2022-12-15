import CouponCodeDiscount from "../models/couponModel";
import order from "../models/orderModel";
import food from "../models/foodModel"
//import moment from "moment";

// ============ ONLY FOR SELLER ==============

export const createCoupon= async (req, res)=>{
    try{
     const data = req.body
   
     const{couponCodeName,foodId} = data
     
     
     const findFood = await food.findOne({_id:foodId},{isDeleted: false})
     if(!findFood){
        return res.status(404).send({status:false,msg:"not found"})
     }
     if(!couponCodeName) return res.status(400).send({status:true,msg:"coupon required"})  
     const couponCreated = await CouponCodeDiscount.create(data)
     
     return res.status(201).send({status:true,msg:"coupon created",data:couponCreated})

    }catch(err){
       return res.status(500).send({status:false,msg:err.message});
    }
   }



// ============================================================ 



export const addCouponCodeDiscount = async(req, res) => {
 const {couponCodeName,orderId,discount,discountStatus,expirationTime} = req.body;
    if (discount && expirationTime) {
        try {
            const { totalPrice } = await order.findOne({_id: orderId }).select("totalPrice").exec();
            const originalPrice:any = totalPrice;

            const finalPrice = originalPrice - discount;
            const endDate = new Date(expirationTime);
            let currentDate = new Date().getTime(); // new Date().getTime() returns value in number
            console.log(endDate, currentDate); // endDate number > currentDate number

            CouponCodeDiscount.findOne({ orderId }).exec((newCouponCodePrice, couponCodePriceUpdate) => {
                    if (!couponCodePriceUpdate) {
                        // it is newCouponCodeprice
                     if (orderId && couponCodeName.length >= 5 &&couponCodeName.length <= 15) {
                          const couponCodeDiscount = new CouponCodeDiscount({ couponCodeName,discountStatus, orderId,discount,originalPrice,finalPrice: finalPrice,expirationTime: endDate,});

                          couponCodeDiscount.save().then((couponDiscountProduct)=> {
                                      console.log(couponDiscountProduct);
                                      return res.status(201).json({ status: true, message: `Congrats,You have received Rs ${discount} as a product`,couponDiscountProduct,});}).catch((error) => {
                                     console.log(error);
                                return res.status(400).json({status: false,message: "Something went wrong.You might have missed some field", error,
                                }); });
                        } else {
                            return res.status(403).json({
                                status: false,
                                message: "Unmatched Coupon Code. Discount Denied !!",
                            });
                        }
                    }
                    if (couponCodePriceUpdate) {
                        // it is update discount order of existing orderID
                        const discountObj = {couponCodeName, discountStatus, orderId,discount,originalPrice, finalPrice: finalPrice,expirationTime: endDate};

                        // for update, coupon code must be between 5 and 15

                        if ( discountObj.couponCodeName.length >= 5 && couponCodeName.length <= 15) {
                            // if coupon code expires,then it cannot be updated
                            CouponCodeDiscount.findOneAndUpdate({ orderId: orderId },
                                discountObj,{new: true, 
                                    // it returns the document after it is updated in databaseupsert: true, // if no such couponcode status type found in mongodb, then value is not updated in databse
                                }).exec((error, couponDiscountProduct) => {
                                if (error) {
                                    console.log(error);
                                    return res.status(400).json({
                                        status: false,
                                        message: "Opps...Coupon Code Discount cannot be updated",
                                    });
                                }
                                if (couponDiscountProduct) {
                                    return res.status(201).json({status: true,message: `Coupon Code Discount is updated..`,
                                        couponDiscountProduct,
                                    });
                                }
                            });
                        } else {
                            return res.status(400).json({status: false, message: "Coupon Code length must be between 5 and 15.",
                            });
                        }
                    }
                }
            );
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Invalid Product id or Coupon Code...",
            });
        }
    } else {
        return res.status(400).json({
            status: false,
            message: "Something went Wrong, Discount or expiration time is invalid ",
        });
    }
};


export const applyCoupon = async (req, res) => {
    try{
        const couponId = req.params.couponId;
        const findCoupon:any = await CouponCodeDiscount.findOne({_id: couponId},{isDeleted: false})
        if(!findCoupon){
            return res.status(404).send({status:false,msg:"coupon not found"})
        }
        const {orderId}=req.body
      
        const findOrder:any = await order.findOne({_id:orderId},{isDeleted: false})
        if(!findOrder){
            return res.status(404).send({status:false,msg:"order not found"})
        }
        const finalPrice = findOrder.totalPrice-findCoupon.discount
        const Order:any = await order.findOneAndUpdate({_id:orderId},{$set:{totalPrice:finalPrice}})
        return res.status(200).send({status:true,msg:`after applying coupon you have to pay ${finalPrice}`,data:Order})


    }catch(err){
       return res.status(500).send({status:false,msg:err.message});
    }
}
