import mongoose,{Schema, model} from 'mongoose'


interface review{
    restroId:String;
    userId:String;
    rating:number;
    comment:string;
    reviewedAt:Date;
    isDeleted:Boolean;
}
const reviewSchema = new Schema<review>({
    restroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users" 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true
    },
    reviewedAt: {
        type: Date,
        default: Date.now()
    }, 
    isDeleted:{
        type: Boolean,
        default:false
    } 
  },

)

const reviewModel= model <review>('reviews',reviewSchema)
export default reviewModel