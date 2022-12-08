import mongoose,{Schema, model} from 'mongoose'

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
interface restaurant{
    name:string;
    description:string;
    address: string;
    mobile:Number;
    reviews:[];
    rating:Number;
    numReviews: Number;
    files:String
}
const restaurantSchema = new Schema<restaurant>({
 
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
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

const RestaurantModel = model<restaurant>('restaurant', restaurantSchema)
export default RestaurantModel