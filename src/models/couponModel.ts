import mongoose,{Schema, model} from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId
import moment from "moment"

interface coupon{
    couponCodeName:String;
    foodId:String
    orderId:String;
    discount:Number;
    discountStatus:Boolean;
    originalPrice: Number;
    finalPrice:Number
    createdAt:String;
    updatedAt:String;
    expirationTime:String;
}

const couponSchema = new Schema<coupon>({
    couponCodeName: {
        type: String,
        trim: true,
    },
    orderId: {
        type: ObjectId,
        ref: "Order",
    },
    foodId:{
        type: ObjectId,
        ref:"foods"
    },
    discount: {
        type: String,
    },
    discountStatus: {
        type: Boolean,
    },
    originalPrice: {
        type: Number,
    },
    finalPrice: {
        type: Number,
    },
    createdAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    updatedAt: {
        type: String,
        default: moment().format("DD/MM/YYYY") + ";" + moment().format("hh:mm:ss"),
    },
    expirationTime: {
        type: String,
    },
});

const couponModel = model<coupon>('coupon', couponSchema)
export default couponModel