import review from "../models/reviewModel";
import user from "../models/userModel";
import restro from "../models/restaurantModel"
import * as val from "../validation/validation";

export const addReview= async (req:any,res:any)=>{
    try{
     const restroId=req.params.restroId;
     const userId=req.params.userId;

     const findUser = await user.findOne({_id:userId},{isDeleted: false})
     if(!findUser){
        return res.status(404).send({status:false,msg:"user not found"})
     }

     const findRestro = await restro.findOne({_id:restroId},{isDeleted: false})
     if(!findRestro){
        return res.status(404).send({status:false,msg:"restro not found"})
     }

     let data = req.body

     if (Object.keys(data).length == 0) {
         return res.status(400).send({ status: false, msg: "body is missing" })
     }

     const  reviewedBy = findUser.name
     var { rating,comment } = data

     if (!val.isValidObjectId(restroId)) {
         return res.status(400).send({ status: false, msg: "restro Id is not valid" })
     }

     if (!val.isValid(reviewedBy)) {
         return res.status(400).send({ status: false, msg: " reviewd by is missing" })
     }

     if (rating > 5 || rating < 1) {
         return res.status(400).send({ status: false, mag: "rating should be in between 1 to 5" })
     }

     const reviewGenerated = await review.create(data)
     const obj = await restro.findOneAndUpdate({ _id: restroId }, { $inc: { reviews: 1 } })

     const {...data1 }:any= findRestro
     // console.log(reviewGenerated)

     console.log(data1)
     data1._doc.reviews = reviewGenerated

     return res.status(201).send({ status: true, msg: "reviewed", data: data1._doc })


    }catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}

export  const updateReview = async (req, res) => {
    try{
     const reviewId = req.params.reviewId;
     const restroId = req.params.restroId;

     const findreview = await review.findOne({_id:reviewId},{isDeleted: false})
     if(!findreview){
        return res.status(404).send({status:false,msg:"review not found"})
     }

     const findRestro = await restro.findOne({_id:restroId},{isDeleted: false})
     if(!findRestro){
        return res.status(404).send({status:false,msg:"restro not found"})
     }
     
     let data = req.body
     if (Object.keys(data).length == 0) {
         return res.status(400).send({ status: false, msg: "data is missing from the body" })
     }

     const {rating,comment}=data 
     let obj:any = {};
     if(rating){
        if (rating > 5 || rating < 1) {
            return res.status(400).send({ status: false, mag: "rating should be in between 1 to 5" })
        }
        obj.rating = rating
     }
     if(comment){
        if (!val.isValid(comment)) {
            return res.status(400).send({ status: false, msg: "comment is not in valid format" })
        }
        obj.comment = comment
     }
     const updatedReview = await review.findOneAndUpdate({ _id: reviewId }, {$set: obj})

     const restroDetailsAfterUpdate = await restro.findById({ _id: restroId })
     const allreviewrs = await review.find({ reviewId: reviewId })

     const {...data1 }:any = restroDetailsAfterUpdate
     data1._doc.reviewsData = allreviewrs

     return res.status(200).send({ status: false, msg: "updated", data: data1._doc })

    }catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}


export const deleteReview = async (req, res) =>{
    try{
     const restroId = req.params.restroId;
     const reviewId = req.params.reviewId;

     const findRestro = await restro.findOne({_id:restroId},{isDeleted: false});
     if(!findRestro){
        return res.status(404).send({status:false,msg:"restro not found"})
     }

     const findReview = await review.findOne({_id:reviewId},{isDeleted:false})
     if(!findReview){
        return res.status(404).send({status:false,msg:"review not found / already deleted"})
     }
     const deletedReview = await review.findOneAndUpdate({ _id: reviewId }, { $set: { isDeleted: true } })
     if (!deletedReview) {
         return res.status(400).send({ status: false, msg: "review id is not associated with book id" })
     }

     const decreaseReviewValue = await restro.findOneAndUpdate({ _id: restroId }, { $inc: { reviews: -1 } }, { new: true })
     return res.status(200).send({status: true,msg: "review deleted ",data: decreaseReviewValue})
    
    }catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}