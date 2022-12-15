import mongoose,{connect} from 'mongoose';
//import Rozarpay from "rozarpay"
import  dotenv from "dotenv";
dotenv.config();


export const connects=  ()=>{
  return connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/rushikesh9075-DB?authSource=admin&replicaSet=atlas-9zusex-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
  .then(()=>{
    console.log("DB is connected")
  }).catch((error:any)=>{
    console.log(error)
  })
}


//connect to mongodb in nodejs ?

