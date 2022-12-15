import {Schema, model} from 'mongoose'

interface User{
    name:string;
    email:string;
    mobile:string;
    passcode:number;
    state:string;
    otp:Number;
    confirm_passcode:number
    image:String
}

const userSchema = new Schema<User>({
    name: {
        type: String,
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
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    passcode: {
        type: Number,
        required: true,
        trim: true
    },
    state:{
        type:String,
        required: true
    },
    otp:{
      type:Number
    },
    image:{
        type:String,
    },
    confirm_passcode:{
        type:Number,
        required:true
    }
});

const UserModel = model<User>('users', userSchema)
export default UserModel