import food from "../models/foodModel"
import user from "../models/userModel"
import fav from "../models/favoriteModel"

export const addFav = async (req: any, res:any)=>{
    try{
      const {userId,foodId} = req.body
      const findUser = await user.findOne({_id:userId},{isDeleted: false})
      if(!findUser){
        return res.status(404).send({status:false,msg:"User not found"})
      }
      const findFood = await food.findOne({_id:foodId},{isDeleted: false})
      if(!findFood){
        return res.status(404).send({status:false,msg:"Food not found"})
      }
      const addedFood = await fav.create(req.body)
      return res.status(200).send({status:true,msg:"added to the favorite",data:findFood})

    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}

export const getFavFoods = async (req: any, res: any)=>{
    try{
     const userId= req.params.userId;

     const findFavFoods = await fav.find({userId:userId},{isDeleted: false});
     if(!findFavFoods){
        return res.status(404).send({status:false,msg:"fav foods not added"})
     }
     return res.status(200).send({status:true,msg :"fav food lists",data:findFavFoods})

    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
}

export const deleteFavFood = async (req: any, res: any)=>{
    try{
     const favFoodId = req.params.favFoodId;
     const findfood = await fav.findOneAndUpdate({foodId: favFoodId},{$set:{isDeleted:true}},{new:true})
     if(!findfood){
        return res.status(404).send({status:false,msg:"fav foods not added"})
     }
     return res.status(200).send({status:true,msg :"deleted",data:findfood})

    }catch(err){
        return res.status(500).send({status:false,msg:err.message});
    }
} 