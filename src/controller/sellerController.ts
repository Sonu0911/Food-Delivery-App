import business from "../models/sellerModel"
import { Request, Response } from "express"
import * as val from "../validation/validation"
import seller from "../models/userModel"

export const businessCreate = async (req, res) => {
 try{
  const  data = req.body;

  const { businessName,ownerName,address, gstinNo,email,image} = data
  if(!val.isValid(businessName)){
   return res.status(400).send({status:false, msg:"valid business name is required"})
  }
  if(!val.isValid(ownerName)){
    return res.status(400).send({status:false, msg:"valid owner name is required"})
  }
  if(!val.isValid(address)){
    return res.status(400).send({status:false, msg:"valid address is required"})
  }
  if(!val.isValidPasscode(gstinNo)){
    return res.status(400).send({status:false, msg:"valid gstinNo is required"})
  }
  if(!val.isValidEmail(email)){
    return res.status(400).send({status:false, msg:"valid email is required"})
  }

  const findBusinessName = await business.find({businessName:businessName})
  if(findBusinessName.length>0){
    return res.status(400).send({status:false, msg:"business name already in use"})
  }
  
  const created = await business.create(data)
  return res.status(201).send({status:true, msg:"successfully created",data:created})
  
 }catch(err){
    return res.status(500).send({status:false,msg:err.message})
 }
}


export const payout = async (req:any,res:any) => {
    try{
     let sellerId = req.params.sellerId;
     const findSeller = await seller.findOne({sellerId:sellerId},{isDeleted: false})
     if(!findSeller){
        return res.status(404).send({status:false,msg:"seller not found"})
     }
     const {bankAccount,UPI}=req.body
      
     if(bankAccount) {
        
        
     }

    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}