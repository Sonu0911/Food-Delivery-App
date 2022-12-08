import mongoose,{Schema, model} from 'mongoose'
const ObjectId=mongoose.Schema.Types.ObjectId
interface review{
    name:string;
    rating:number;
    comment:string
}
const reviewSchema = new Schema<review>({
    name: {
         type: String,
         required: true 
        },
    rating: { 
        type: Number, 
        required: true 
    },
    comment: { 
        type: String, 
        required: true
     },
  }, 
)
interface food{
    name:string;
    category:String;
    restaurant:String;
    description:string;
    price: Number;
    reviews:[];
    rating:Number;
    numReviews: Number
}
const foodSchema = new Schema<food>({
  name: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  restaurant: {
    type: ObjectId,
    required: true,
    ref: "Restaurant",
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
})

const foodModel = model<food>('foods', foodSchema)
export default foodModel