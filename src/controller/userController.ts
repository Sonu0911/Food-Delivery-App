import userModel from "../models/userModel"
import jwt from "jsonwebtoken";
import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import * as val from "../validation/validation"
import {GenerateOtp,getOtp} from "../util/util"

//import createJwtToken from "../middleware/middleware"

// ================SIGN UP THE USER======================================

export const signup = async (req: any, res: Response) => {
    try { 

        const { name, mobile, email, passcode ,confirm_passcode,state} = req.body

        if (!val.isValid(name) || !val.isValidPhone(mobile) || !val.isValidEmail(email) || !val.isValidPasscode(passcode) || !val.isValidPasscode(confirm_passcode) || !state) {
            return res.status(400).send({ status: false, msg: "all valid fields are required" })
        }

        if (passcode.length > 6 || confirm_passcode.length < 6){
            return res.status(400).send({ status: false, msg: "required passcode length is 6 " })
        }

        if( passcode !== confirm_passcode){
            return res.status(400).send({ status: false, msg: "please enter the same passcode " })
        }
        // const salt = await bcrypt.genSalt(6);
        // data.passcode = await bcrypt.hash(data.passcode, salt)

        let duplimobile = await userModel.find({ mobile: mobile })
        if (duplimobile.length > 0) {
            return res.status(400).send({ status: false, msg: "mobile number already exits" })
        }

        let dupliEmail = await userModel.find({ email: email })
        if (dupliEmail.length > 0) {
            return res.status(400).send({ status: false, msg: "email is already exists" })
        }
       
        const  otp:Number= GenerateOtp()
    
        let savedData = await userModel.create(req.body)
        const gOTP =  await  getOtp(otp,mobile)
        savedData.otp=otp;
        await savedData.save();

        return res.status(200).send({ status:true, msg: "otp sent successfully",data:savedData._id,otp})

    } catch (error:any) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

// ======================= VERIFY OTP =======================

export const verifyRegisterOtp = async (req, res) => {
    try {
      const { otp, userId } = req.body;
      const user = await userModel.findById({_id:userId});
      if (!user) {
        return res.status(400).send({ status:false, message: "user not found" });
      }
  
      if (otp !== user.otp) {
        return res.status(400).send({ status:false, message: "incorrect otp" })
      }
      const token = jwt.sign({userId:user._id}, 'Rushi-159', { expiresIn: "12h" });
  
      return res.status(201).json({type: "success",message: "OTP verified successfully",data: {userId: user._id,token},
      });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message})
    }
  };
  
//========================= Login the user with the help of mobile====================;

export const login = async (req: Request, res: Response)=> {
    try{
     
      const {userId,mobile,passcode}=req.body

      const userfind = await userModel.findOne({_id:userId},{isDeleted: false})
        if(!userfind){
          return res.status(404).send({status:false,msg:"user not found"})
        }
        if(!val.isValidPhone(mobile)){
          return res.status(400).send({ status: false,msg:"mobile number is required"})
        }
        if(!passcode){
          return res.status(404).send({status:false,msg:"passcode is required"})
        }
        if(passcode !== userfind.passcode){
          return res.status(400).send({status:false,msg:"please  enter valid passcode"})
        }

       const  otp: Number= GenerateOtp()
       const gOTP =  await  getOtp(otp,mobile)
       userfind.otp=otp;
       await userfind.save();

       return res.status(201).send({ status: true,msg: "otp sent successfully",userId:userfind._id,otp})

    }catch(error){
        return res.status(500).send({ status: false, msg: error.message})
    }
}

//================ verify the otp sent on mobile number===============;

export const verifyLoginOtp = async (req, res) => {
    try {
      const { otp, userId } = req.body;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).send({ status:false, message: "user not found" });
      }
  
      if (otp !== user.otp) {
        return res.status(400).send({ status:false, message: "incorrect otp" })
      }
  
      const token = jwt.sign({userId:user._id}, 'Rushi-159', { expiresIn: "12h" });
      return res.status(201).json({ type: "success",message: "OTP verified successfully", data: { token,userId: user._id, },
      });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message})
    }
  };
  
//============ user can update his profile===========;

  export const updateUser= async (req: Request, res: Response) => {
    try{
        let userId = req?.params?.userId
        let data=req.body;
  
        if(Object.keys(data).length==0){
          return res.status(400).send({status:false,msg:"enter valid data"})
        }
  
        const findUser = await userModel.findOne({_id:userId,isDeleted:false})
        if(!findUser){
          return res.status(404).send({status:false,msg:"user not found"})
        }
  
        const { name,mobile, email,passcode,new_passcode,confirm_new_passcode} = data
  
        if (val.isValid(name)){
          if(!name) return res.status(400).send({ status: false, msg: "Name is not valid" });
        }
   
        if (mobile){
          if (!val.isValidPhone(mobile)) {
              return res.status(400).send({ status: false, msg: "valid phone number is required" })
          }  
        }
  
        if(email){
          if (!val.isValidEmail(email)) {
              return res.status(400).send({ status: false, msg: "valid email is required" })
          }
        }
  
        if(passcode){
          if(!passcode){
              return res.status(400).send({ status: false, msg: "Plz valid passcode" })
            }
          if (passcode!==findUser.passcode) {
              return res.status(400).send({ status: false, msg: "Plz enter correct passcode" })
          }
          if (passcode.length < 6 || passcode.length > 6) {
              return res.status(400).send({ status: false, msg: "required passcode length is 6" })
          }
        }

        if(!new_passcode){
            return res.status(400).send({ status: false, msg: "Plz enter valid new passcode" })
        }

        if(!confirm_new_passcode){
            return res.status(400).send({ status: false, msg: "Plz enter valid confirm passcode" })
        }
        if(new_passcode !== confirm_new_passcode){
            return res.status(400).send({ status: false, msg: "Plz enter the same passcode" })
        }
        
         const updatedUser = await userModel.findOneAndUpdate({_id:userId}, {$set:{name:name,email:email,mobile:mobile,passcode:new_passcode,confirm_passcode:new_passcode}}, {new:true})
         return res.status(200).send({status:true,msg:'successfully updated', data:updatedUser})
    }catch(error){
        return res.status(500).send({ status: false, msg: error.message})
    }  
  }

export const getUser = async (req: Request, res: Response)=> {
    try{
        let userId= req?.params?.userId

        if(!val.isValidObjectId(userId)){
         return res.status(400).send({status:false,msg:"userId is invalid"})
        }

        const findUser= await userModel.findOne({_id:userId},{isDeleted: false})
        if(!findUser){
         return res.status(404).send({status:false,msg:"user not found"})
        }

         return res.status(200).send({status:true,msg:"user found",data:findUser})
    }
     catch(error){
      return res.status(500).send({status:false,msg:error.message})
    }
}

  export const forgotPassode = async(req: Request, res: Response)=>{
    try{
      const mobile=req.body.mobile;

      if (!val.isValidPhone(mobile)) {
        return res.status(400).send({ status: false, msg: "valid phone number is required" })
      } 
      const findUser= await userModel.findOne({mobile:mobile},{isDeleted: false})
      if(!findUser){
        return res.status(404).send({status:false,msg:"user not found"})
      }
      const  otp: number= GenerateOtp()
           findUser.otp=otp;
       await findUser.save();
      return res.status(200).send({ status: true,msg: "otp sent successfully",data:findUser._id,otp})


    }catch(err){
      return res.status(500).send({status:false,msg:err.message})
    }
  }

export const verifyOtp  = async(req: Request, res: Response)=>{
  try{
     const userId=req.body.userId;
     const otp =req.body.otp;
     const user = await userModel.findById(userId);
     if (!user) {
       return res.status(404).send({ status:false, message: "user not found" });
     }
     if (otp !== user.otp) {
       return res.status(400).send({ status:false, message: "incorrect otp" })
     }
    
     const token = jwt.sign({userId:user._id}, 'Rushi-159', { expiresIn: "12h" });
     return res.status(201).json({ message: "OTP verified successfully", data: {userId: user._id,token},
     });

 }catch(err){
  return res.status(500).send({status:false,msg:err.message});
 }
}

export const changePass = async (req, res) => {
 try{
   const userId=req.params.userId
   const {new_passcode,confirm_passcode}=req.body

   const findUser= await userModel.findOne({_id:userId},{isDeleted: false})
   if(!findUser){
    return res.status(404).send({status:false,msg:"user not found"})
   }

   if(req.body.userId!=findUser._id){
    return res.status(403).send({status:false,msg:"you are not authorised"})
   }

   if(new_passcode!==confirm_passcode){
    return res.status(400).send({status:false,msg:"please enter the same passcode"})
   }
   const updatedUser = await userModel.findOneAndUpdate({_id:userId}, {$set:{passcode:new_passcode}}, {new:true})
   let data={userId:updatedUser._id,passcode:updatedUser.passcode}

   return res.status(200).send({status:true,msg:"passcode updated",data:data})

 }catch(err){
  return res.status(500).send({status:false,msg:err.message})
 }
}

