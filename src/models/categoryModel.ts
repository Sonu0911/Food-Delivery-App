import mongoose,{Schema,model} from 'mongoose';

interface category{
  name: string;
  image:string;
  isEnabled: boolean;

}

const categorySchema= new Schema<category>({
   name:{
    type: String,
    required:true
   },
   image:{
    type: String,
    required:true
   },
   isEnabled:{
    type: Boolean,
    default:true
   }
})
const categoryModel= model <category>("category",categorySchema)
export default categoryModel

