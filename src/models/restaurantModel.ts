import mongoose,{Schema, model} from 'mongoose'


interface restaurant{
    name:String;
    description:String;
    address: String;
    mobile:Number;
    rating:Number;
    reviews: Number;
    files:String,
    city:String
    isDeleted:Boolean
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
  city:{
   type: String,
   required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
})

const RestaurantModel = model<restaurant>('restaurant', restaurantSchema)
export default RestaurantModel