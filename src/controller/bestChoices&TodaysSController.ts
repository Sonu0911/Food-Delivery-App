import bestChoice from "../models/bestCoices";
import user from "../models/userModel";
import food from "../models/foodModel"
import * as val from "../validation/validation"

export const bestChoices = async (req,res)=>{
    try{
     const data = req.body   
     const {foodId,userId} = data
     if(!val.isValidObjectId(foodId)){
        return res.status(400).send({status:false,msg:"enter valid foodId"})
     }
     if(!val.isValidObjectId(userId)){
        return res.status(400).send({status:false,msg:"enter valid userId"})
     }
     const findUser = await user.findOne({_id:userId},{isDeleted: false})
     if(!findUser){
        return res.status(404).send({status:false,msg:"User not found"})
     }
     const findFood = await food.findOne({_id:foodId},{isDeleted: false})
     if(!findFood){
        return res.status(404).send({status:false,msg:"food not found"})
     }
     const added = await bestChoice.create(data)
     return res.status(200).send({status:true,msg:"added successfully",data:findFood})
    }catch(err){
       return res.status(500).send({ status: false,msg:err.message });
    }
}

export const getBestChoicesForUser = async (req, res) => {
    try{
     const userId = req.params.userId;
     const findBestChoices:any = await bestChoice.find({userId: userId},{isDeleted: false})
     if(!findBestChoices){
        return res.status(404).send({status:false,message:"not found"})
     }
     const findFoods = await food.find({foodId:findBestChoices.foodId})

     return res.status(200).send({status:true,msg:"success",data:findFoods})
    }catch(err){
       return res.status(500).send({ status: false,msg:err.message });
      }
}

export const addTodaySpecial = async (req:any,res:any)=>{
    try{
     const data = req.body   
     const {foodId,userId} = data
     if(!val.isValidObjectId(foodId)){
        return res.status(400).send({status:false,msg:"enter valid foodId"})
     }
     if(!val.isValidObjectId(userId)){
        return res.status(400).send({status:false,msg:"enter valid userId"})
     }
     const findUser = await user.findOne({_id:userId},{isDeleted: false})
     if(!findUser){
        return res.status(404).send({status:false,msg:"User not found"})
     }
     const findFood = await food.findOne({_id:foodId},{isDeleted: false})
     if(!findFood){
        return res.status(404).send({status:false,msg:"food not found"})
     }
     const added = await bestChoice.create(data)
     return res.status(200).send({status:true,msg:"added successfully",data:findFood})
    }catch(err){
       return res.status(500).send({ status: false,msg:err.message });
    }
}

export const getTodaySpecialForUser = async (req, res) => {
    try{
     const userId = req.params.userId;
     const findBestChoices:any = await bestChoice.find({userId: userId},{isDeleted: false})
     if(!findBestChoices){
        return res.status(404).send({status:false,message:"not found"})
     }
     const findFoods = await food.find({foodId:findBestChoices.foodId})

     return res.status(200).send({status:true,msg:"success",data:findFoods})
    }catch(err){
       return res.status(500).send({ status: false,msg:err.message });
    }
}