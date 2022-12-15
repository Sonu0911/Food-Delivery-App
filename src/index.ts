import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import router     from './routes/userRoute';
import * as connect    from "./config/config";
import router2    from './routes/restaurantRoute'
import router3    from './routes/foodRoute'
import router4    from './routes/categoryRoute'
import router5    from './routes/orderRoute'
import router6    from "./routes/reviewRoute"
import router7    from "./routes/sellerRoute"
import router8    from "./routes/favRoute"
import router9    from "./routes/bestOffersRoute"
import multer     from 'multer'
import ngrok from "ngrok"
import couponCodeDiscount from "./routes/couponRoute";
import CouponCodeDiscount from "./models/couponModel"
import bestChoice from "./routes/bestChoices&TodaySRoute"

import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(__dirname);

app.use('/public', express.static(__dirname+'/uploads'))


export const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,__dirname+'/uploads')
        },  filename:function(req,file,cb){
            cb(null, file.fieldname + "_" + Date.now() + "_" +file.originalname)
        }
    })
}).single("userFile")
  
app.post('/api/file',upload,(req:any,res)=>{
    try{
        const imagePath = req.file.filename
        return res.status(200).send({ status:true,msg:"file uploaded",url: "http://localhost:3000/public/" + imagePath })
    } catch(e) {
        console.log(e)
    }
});

(async function() {
    await ngrok.connect();
  })()
  

//checking coupon code expiration time valid or not to reduce server load
app.use("/api", couponCodeDiscount);

export const checkExpirationTime = () => {
    CouponCodeDiscount.find({}) .exec()
        .then((Coupon) => {
            if (Coupon) {
                Coupon.map((getCoupon:any) => {
                    if (
                        new Date().getTime() >= new Date(getCoupon.expirationTime).getTime() // expirationTime data access from database
                    ) {
                        CouponCodeDiscount.findOneAndDelete({
                                _id: getCoupon._id,
                            })
                            .exec()
                            .then((deleteCoupon) => {
                                console.log(`Coupon doesnt exists or expired`);
                            })
                            .catch((error) => {
                                console.log(error, "Error occured on coupon section");
 });
                    }
                });
            }
            if (!Coupon) {
                console.log("No Coupon found...");
            }
        });
};
setInterval(checkExpirationTime, 1000); // converting to millisecond
couponCodeDiscount.post("/checkExpirationTime",checkExpirationTime)



connect.connects()
app.use('/', router,router2,router3,router4,router5,router6,router7,couponCodeDiscount,router8,router9,bestChoice)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});