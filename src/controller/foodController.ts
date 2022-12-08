import { Request, Response } from "express"
import * as val from "../validation/validation"
import  foodModel from "../models/foodModel"
import  restroModel from '../models/restaurantModel'

export const addingFood = async (req: Request, res: Response)=>{
  try{
        const data=req.body
        const{name,category,restaurant,description,price,reviews,rating}=data

        if(!name || !category || !restaurant || !description || !price || !reviews || !rating){
            return res.status(400).send({status:false,msg:"this field is required"})
        }
        const foodFound=await foodModel.find({name:name})
         if ( foodFound.length > 0){
            return res.status(400).send({status:false,msg:"food name is already exist"})
        }
        let savedData = await foodModel.create(data)
            return res.status(201).send({status: true,msg: "food added successfully",data: savedData
        })
    
    }
  catch(error){
            return res.status(500).send({status:false,message:error.message})
    }
}

export const getFoodByRestro=async (req, res) =>{
    try{
        const foodId=req?.params?.foodId;

        if(!val.isValidObjectId(foodId)){
          return res.status(400).send({ status: false, msg: "id is invalid"})
        }

        const foodFind = await foodModel.findOne({_id:foodId},{isDeleted:false})
        if(!foodFind){
          return res.status(404).send({status:false,msg:"food not found"})
        }

          return res.status(200).send({status:true, msg:"food found",data:foodFind})
    }
    catch(error){
          return res.status(500).send({status:false,msg:error.message})
    }
}


export const getListOfFood=async (req: Request, res: Response)=>{
    try{
       const foodList = await foodModel.find({isDeleted:false})
       if(!foodList){
        return res.status(404).send({status:false,msg:"food not found"})
       }
        return res.status(200).send({status:true,msg:"food list",data:foodList})

    }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

export const getFood = async (req: Request, res: Response)=>{
    try{
     const restroId = req?.params?.restroId

     const food = await foodModel.find({restaurant:restroId},{isDeleted:false})
       if(!food){
        return res.status(404).send({status:false,msg:"not found"})
       }
        return res.status(200).send({status:true,msg:"food found",data:food})
      
    }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}

export const deleteFood=async (req:Request, res:Response) => {
    try{
     const foodId=req?.params?.foodId;
     if(!val.isValidObjectId(foodId)){
        return res.status(400).send({ status: false, msg: "id is invalid"})
      }

     const foodFound = await foodModel.findOneAndDelete({_id:foodId},{new:true})
     if(!foodFound){
        return res.status(404).send({status:false,msg:"food not found or already deleted"})
     }
        return res.status(200).send({status:true,msg:"food deleted successfully"})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}