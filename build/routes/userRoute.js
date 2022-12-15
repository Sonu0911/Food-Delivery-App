"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../controller/userController"));
const router = express_1.default.Router();
const middleware_1 = __importDefault(require("../middleware/middleware"));
router.post("/register", userController.signup);
router.post("/verifyRegisterOtp", userController.verifyRegisterOtp);
router.post("/login", userController.login);
router.post("/verifyLoginOtp", userController.verifyLoginOtp);
router.put("/updateUser/:userId", userController.updateUser);
router.get("/getUser/:userId", userController.getUser);
router.post("/forgotPass", userController.forgotPassode);
router.post("/verifyOtp", userController.verifyOtp);
router.put("/changePass/:userId", middleware_1.default, userController.changePass);
exports.default = router;
