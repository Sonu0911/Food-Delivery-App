import mongoose,{Schema, model} from 'mongoose'


interface payout{
 accountHolderName:String,
 accountNo:Number,
 IFSCcode :String,
 bankName : String,
 upi:String,
}
const payoutSchema = new Schema<payout>({
    accountHolderName :{
        type:String,
    },
    accountNo :{
        type:Number,
    },
    IFSCcode :{
        type:String
    },
    bankName :{
        type:String
    },
    upi:{
        type:String
    }
})

const payoutModel = model<payout>('payout', payoutSchema)
export default payoutModel