import {Request, Response,NextFunction} from 'express';
import jwt, { decode } from 'jsonwebtoken'
// import user from "../models/userModel"

export const authenticate=async(req: Request, res: Response,next: NextFunction)=>{
 try{
      const token:any=req.headers["x-api-key"]
      if(!token){
        return res.status(404).send({status:false,msg:"please enter token"})
      }
      let decodeToken:any =jwt.verify(token,"Rushi-159")
      if(!decodeToken){
        return res.status(400).send({status:false,msg:"invalid token"})
      }
       req.body.userId = decodeToken.userId
       next()
 }catch(err){
  return res.status(500).send({status:false,msg:err.message});
 }
}
export default authenticate

