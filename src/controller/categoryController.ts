import  category from '../models/categoryModel';
import {Request, Response} from 'express'


export const createCategory = async (req: Request, res: Response)=>{
  try{
    const data=req.body;
    const{name,image}=data;

    if(!name || !image) {
        return res.status(400).send({status:false, message:"field is required"})
    } 
    const dupliName=await category.find({name:name})
    if(dupliName.length>0){
       return res.status(400).send({status:false,message:"name is already in category"})
    }

    const createdCategory = await category.create(data)
    return res.status(201).send({status:true, message:"created category",data:createdCategory})

  }catch(err){
     return res.status(500).send({status:false, msg:err.message})
  }
}

export const getCategory = async (req: Request, res: Response)=>{
    try{
      const categoryFind=await category.find({isDeleted:false})
      if(!categoryFind){
        return res.status(404).send({status:false,msg:"not found"})
      }
        return res.status(200).send({status:false,msg:"list of category",data:categoryFind})
    }catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

export const deleteCategory = async(req, res) => {
    try{
      const categoryId=req.params.categoryId

      const findCategory= await category.findOneAndDelete({_id:categoryId},{new:true})
      if(!findCategory){
        return res.status(404).send({status:false,mesaage:"not found or already deleted"})
      }
      
      return res.status(200).send({status:true,mesaage:"successfully deleted",data:findCategory})
    } catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}