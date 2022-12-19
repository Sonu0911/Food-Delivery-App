import mongoose,{Schema, model} from 'mongoose'

interface bestOffers{
    foodId:String
    userId:String;
    image:string;
    description:String;
    discountPrice:Number,
    isDeleted:Boolean;
}
const bestOffersSchema = new Schema<bestOffers>({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users" 
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    discountPrice:{
     type:Number,
    },
    isDeleted:{
        type: Boolean,
        default:false
    } 
  },
)

const bestOffersModel = model <bestOffers>('bestOffers',bestOffersSchema)
export default bestOffersModel