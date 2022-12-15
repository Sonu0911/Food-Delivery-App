import mongoose,{Schema, model} from 'mongoose'


interface bestCoices{
    foodId:String
    userId:String;
    isDeleted:Boolean;
}
const bestCoicesSchema = new Schema<bestCoices>({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foods"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users" 
    },
    isDeleted:{
        type: Boolean,
        default:false
    } 
  },
)

const bestCoicesModel = model <bestCoices>('bestCoices',bestCoicesSchema)
export default bestCoicesModel