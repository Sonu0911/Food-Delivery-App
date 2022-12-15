import mongoose,{Schema, model} from 'mongoose'
const ObjectId=mongoose.Schema.Types.ObjectId

interface food{
    name:string;
    category:String;
    restaurant:String;
    description:string;
    price: Number;
    reviews:[];
    rating:Number;
    numReviews: Number;
    image:string;
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
  reviews: [],
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
  image:{
    type: String,
  }
})

const foodModel = model<food>('foods', foodSchema)
export default foodModel