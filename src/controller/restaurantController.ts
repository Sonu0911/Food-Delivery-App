import restaurantModel from "../models/restaurantModel"
import { Request, Response } from "express"
import * as val from "../validation/validation";


export const addRestaurant=async (req: any, res:Response)=>{
  try{ 
    let data = req.body;
   
    const {  name,description,address, mobile} = data

    if(!name || !description || !address || !mobile ){
        return res.status(400).send({ status: false, msg: "all fieldas is required"})
    }   
    const restrofind = await restaurantModel.find({name:name})
    if(restrofind.length>0){
      return res.status(400).send({ status: true,msg:"restro is already in list"})
    }

    let savedData = await restaurantModel.create(data)
        return res.status(201).send({status: true,msg: "Restaurant created successfully",data: savedData
    })

  }catch(error){
    return res.status(400).send({ status: false,msg: error.message})
  }
}


export const getRestaurantById = async(req: Request, res: Response) =>{
  try {
      let restroId = req?.params?.restroId.trim()

      if (!val.isValidObjectId(restroId)) {
          return res.status(400).send({status: false,msg: "path param is invalid"})
      }

      const findRestro = await restaurantModel.findOne({ _id: restroId, isDeleted: false })
        if(!findRestro) {
          return res.status(404).send({status: false,msg: "could not found"})
      }

      return res.status(200).send({status: true,msg: "Restro found",data: findRestro })

  } catch (error:any) {
      return res.status(500).send({status: false,msg: error.message})
  }
}

export const getAllRestro = async  (req: Request, res: Response) => {
  try {
     let data = req.query
     const {name, description, address, mobile, reviews, rating, numReviews} = data;
     let queryObj: any = {};
     if(name){
      queryObj.name = ({$regex: name, $options:'i'})
     }
     if(rating){
      queryObj.rating =  rating
     }
     if(reviews){
      queryObj.reviews =  ({$regex: reviews, $options:'i'})
     }
     let result = restaurantModel.find(queryObj)
     let sort: any = data.sort;
     if(sort){
      let sortList = sort.split(',').join(' ');
      result = result.sort(sortList)
     }
     else{
      result = result.sort('name')
     }
     let select : any = data.select;
     if(select){
      let selectList = select.split(',').join(' ');
      result = result.select(selectList)
     }
     const findAllRestro = await result
    
      if(!findAllRestro){
        return res.status(404).send({ status: false, msg: "restaurant is not found"})
      }
        return res.status(200).send({ status: true, message: "List of all Restro", data: findAllRestro, totalData: findAllRestro.length })

  } catch (err:any) {
      res.status(400).send({status:false, message:err.message})
  }
}

export const getRestroByCity=async (req, res) => {
  try{ 
   const city = req.params.city;

   const findRestro = await restaurantModel.find({city:city},{isDeleted: false})
   if(!findRestro){
    return res.status(404).send({ status: false, msg: "restaurant is not found"})
   }
   return res.status(200).send({ status: true, message: "List of Restro", data: findRestro })

  }catch(err){
    res.status(500).send({status:false, message:err.message})
  }
}