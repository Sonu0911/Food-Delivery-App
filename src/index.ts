import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import router     from './routes/userRoute';
import * as connect    from "./config/config";
import router2    from './routes/restaurantRoute'
import router3    from './routes/foodRoute'
import router4    from './routes/categoryRoute'
import router5    from './routes/orderRoute'
import multer     from 'multer'
import ngrok from "ngrok"

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
  
connect.connects()
app.use('/', router,router2,router3,router4,router5)

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});