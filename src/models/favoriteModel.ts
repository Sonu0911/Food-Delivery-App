import mongoose,{Schema, model} from 'mongoose'


interface favorite{
    foodId:String
    userId:String;
    isDeleted:Boolean;
}
const favoriteSchema = new Schema<favorite>({
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

const favoriteModel = model <favorite>('favorites',favoriteSchema)
export default favoriteModel