import smsClient from "twilio"
const client = smsClient("ACa081f7c439435784fdc54fdeee9c2060", "dbbbfaed0327d2b83732823ad9559c72")

export const GenerateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000);
    return otp;
}

export const getOtp = async (otp: Number,mobile: any)=>{
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: `+91${mobile}` ,
        from: '+16075588497'
    })
    return response
}
