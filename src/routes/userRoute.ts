import express from 'express';
import * as userController from '../controller/userController'
const router = express.Router();
import mid from "../middleware/middleware"

// 1. signup the user
router.post("/register", userController.signup)

//2. verify the otp
router.post("/verifyRegisterOtp",userController.verifyRegisterOtp)

//3. login with mobile number
router.post("/login",userController.login)

//4. verify the login otp
router.post("/verifyLoginOtp",userController.verifyLoginOtp)

// 5. Edit the user's profile;
router.put("/updateUser/:userId",userController.updateUser)

// 6. Get the user;
router.get("/getUser/:userId",userController.getUser)

// 7. Forgot passcode;
router.post("/forgotPass",userController.forgotPassode)

// 8. Verification ;
router.post("/verifyOtp",userController.verifyOtp)

// 8. Change passcode ;
router.put("/changePass/:userId",mid,userController.changePass)

export default router