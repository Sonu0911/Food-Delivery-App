import offer from "../models/bestOffers"
import user from "../models/userModel";
import food from "../models/foodModel";
import * as val from "../validation/validation"

export const addBestOffers = async (req: any, res: any)=>{
    try{
        const data = req.body;
        const {userId,foodId,note,image} = data
   
     const findUser = await user.findOne({_id:userId},{isDeleted: false})
     if(!findUser){
        return res.status(404).send({status:false,msg:"user not found"})
     }
     const findFood = await food.findOne({_id:foodId},{isDeleted: false})
     if(!findFood){
        return res.status(404).send({status:false,msg:"Food not found"})
     }
     if(!val.isValidImageLink(image)){
        return res.status(400).send({status:false,msg:"valid image link is required"})
     }
     if(!val.isValid(note)){
        return res.status(400).send({status:false,msg:"note is required"})
     }
     const createdOffers = await offer.create(data)
     return res.status(201).send({status:true,msg:"offer created successfully",data:createdOffers})

    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}


export const getOfferList = async (req: any, res: any)=>{
    try{
      const userId = req.params.userId;
      const findOffers = await offer.find({userId:userId},{isDeleted: false})
      if(!findOffers){
        return res.status(404).send({status:false,msg:"you don't have any offers"})
      }
      return res.status(200).send({status:true,msg:"offers for you",data:findOffers})

    } catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}

export const editOffers = async (req, res) => {
    try{
       const offerId = req.params.offerId;
       const data = req.body.data
       const {image,note}=data
       const obj:any ={}
      
       if(image){
          if(!val.isValidImageLink(image)){
            return res.status(400).send({ status: false, msg: "please enter valid image link"})
          }
          obj.image = image
       }
       if(note){
        if(!val.isValid(note)){
          return res.status(400).send({ status: false, msg: "please enter valid note link"})
        }
        obj.note = note
       }

       const findOffer = await offer.findOneAndUpdate({_id:offerId},{$set:{image:image,note:note}},{isDeleted: false});
       if(!findOffer){
        return res.status(400).send({status:false,msg:"not found any offer"})
       }
        return res.status(200).send({status:true,msg:"edited successfully",data:findOffer})

    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}