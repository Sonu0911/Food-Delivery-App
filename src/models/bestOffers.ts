import mongoose,{Schema, model} from 'mongoose'

interface bestOffers{
    foodId:String
    userId:String;
    image:string;
    note:String;
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
    note:{
        type:String,
        required:true
    },
    isDeleted:{
        type: Boolean,
        default:false
    } 
  },
)

const bestOffersModel = model <bestOffers>('bestOffers',bestOffersSchema)
export default bestOffersModel