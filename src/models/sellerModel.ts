import {Schema, model} from 'mongoose'

interface seller{
    businessName:String;
    ownerName:String;
    address:String;
    gstinNo:Number;
    email:String;
    image:String
}

const sellerSchema = new Schema<seller>({
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    ownerName: {
        type: String, 
        required: true,   
    },
    address: {
        type: String,
        required: true,
    },
    gstinNo: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
         unique: true, 
         trim: true, 
         lowercase: true
    },
    image:{
        type:String,
    },
});

const sellerModel = model<seller>('seller', sellerSchema)
export default sellerModel