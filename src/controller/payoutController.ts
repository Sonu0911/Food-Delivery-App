import payout from "../models/payout"
import * as val from "validation/validation"


export const withdraw = async (req: any, res: any)=>{
    try{ 
       const {bankAccount,accountHolderName,accountNo,IFSCcode,bankName,upi} = req.body;
       if(bankAccount ){
           if(!val.isValid(accountHolderName)){
            return res.status(400).send({status: false, msg:"please enter valid account holder name"})
           }
           if(!val.isValidPincode(accountNo)){
            return res.status(400).send({status: false, msg:"please enter valid account number"})
           }
           if(!val.isValidPincode(IFSCcode)){
            return res.status(400).send({status: false, msg:"please enter valid ifsc code number"})
           }
           if(!val.isValid(bankName)){
            return res.status(400).send({status: false, msg:"please enter valid bank name"})
           }
           if(!val.isValid(upi)){
            return res.status(400).send({status: false, msg:"please enter valid upi"})
           }
           return res.status(200).send({status:false, msg:"please enter valid "})
        }
        if(upi){
            if(!val.isValid(upi)){
                return res.status(400).send({status: false, msg:"please enter valid upi "})
            }
        }
          const accountAdd = await payout.create(req.body)
          return res.status(200).send({status:true,msg:"added successfully",data:accountAdd})
          
    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}
