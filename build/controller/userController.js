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
exports.verifyOtp = exports.forgotPassode = exports.getUser = exports.updateUser = exports.verifyLoginOtp = exports.login = exports.verifyRegisterOtp = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const val = __importStar(require("../validation/validation"));
const util_1 = require("../util/util");
const signup = async (req, res) => {
    try {
        let data = req.body;
        const { name, mobile, email, passcode, confirm_passcode, state } = data;
        if (!val.isValid(name) || !val.isValidPhone(mobile) || !val.isValidEmail(email) || !val.isValidPasscode(passcode) || !val.isValidPasscode(confirm_passcode) || !state) {
            return res.status(400).send({ status: false, msg: "all valid fields are required" });
        }
        if (passcode.length > 6 || confirm_passcode.length < 6) {
            return res.status(400).send({ status: false, msg: "required passcode length is 6 " });
        }
        if (passcode !== confirm_passcode) {
            return res.status(400).send({ status: false, msg: "please enter the same passcode " });
        }
        let duplimobile = await userModel_1.default.find({ mobile: mobile });
        if (duplimobile.length > 0) {
            return res.status(400).send({ status: false, msg: "mobile number already exits" });
        }
        let dupliEmail = await userModel_1.default.find({ email: email });
        if (dupliEmail.length > 0) {
            return res.status(400).send({ status: false, msg: "email is already exists" });
        }
        const otp = (0, util_1.GenerateOtp)();
        let savedData = await userModel_1.default.create(data);
        const gOTP = await (0, util_1.getOtp)(otp, mobile);
        return res.status(200).send({ status: true, msg: "otp sent successfully", data: savedData._id, otp });
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};
exports.signup = signup;
const verifyRegisterOtp = async (req, res) => {
    try {
        const { otp, userId } = req.body;
        const user = await userModel_1.default.findById({ _id: userId });
        if (!user) {
            return res.status(400).send({ status: false, message: "user not found" });
        }
        if (otp !== otp) {
            return res.status(400).send({ status: false, message: "incorrect otp" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'Rushi-159', { expiresIn: "12h" });
        return res.status(201).json({ type: "success", message: "OTP verified successfully", data: { userId: user._id, token },
        });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.verifyRegisterOtp = verifyRegisterOtp;
const login = async (req, res) => {
    try {
        const userId = req.body.userId;
        const mobile = req.body.mobile;
        const passcode = req.body.passcode;
        const userfind = await userModel_1.default.findOne({ _id: userId }, { isDeleted: false });
        if (!userfind) {
            return res.status(404).send({ status: false, msg: "user not found" });
        }
        if (!val.isValidPhone(mobile)) {
            return res.status(400).send({ status: false, msg: "mobile number is required" });
        }
        if (!passcode) {
            return res.status(404).send({ status: false, msg: "passcode is required" });
        }
        if (passcode !== userfind.passcode) {
            return res.status(400).send({ status: false, msg: "please  enter valid passcode" });
        }
        const otp = (0, util_1.GenerateOtp)();
        const gOTP = await (0, util_1.getOtp)(otp, mobile);
        return res.status(201).send({ status: true, msg: "otp sent successfully", userId: userfind._id, otp });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.login = login;
const verifyLoginOtp = async (req, res) => {
    try {
        const { otp, userId } = req.body;
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return res.status(400).send({ status: false, message: "user not found" });
        }
        if (otp !== otp) {
            return res.status(400).send({ status: false, message: "incorrect otp" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'Rushi-159', { expiresIn: "12h" });
        return res.status(201).json({ type: "success", message: "OTP verified successfully", data: { token, userId: user._id, },
        });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.verifyLoginOtp = verifyLoginOtp;
const updateUser = async (req, res) => {
    try {
        let userId = req?.params?.userId;
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "enter valid data" });
        }
        const findUser = await userModel_1.default.findOne({ _id: userId, isDeleted: false });
        if (!findUser) {
            return res.status(404).send({ status: false, msg: "user not found" });
        }
        const { name, mobile, email, passcode, new_passcode, confirm_new_passcode } = data;
        if (val.isValid(name)) {
            if (!name)
                return res.status(400).send({ status: false, msg: "Name is not valid" });
        }
        if (mobile) {
            if (!val.isValidPhone(mobile)) {
                return res.status(400).send({ status: false, msg: "valid phone number is required" });
            }
        }
        if (email) {
            if (!val.isValidEmail(email)) {
                return res.status(400).send({ status: false, msg: "valid email is required" });
            }
        }
        if (passcode) {
            if (!passcode) {
                return res.status(400).send({ status: false, msg: "Plz valid passcode" });
            }
            if (passcode !== findUser.passcode) {
                return res.status(400).send({ status: false, msg: "Plz enter correct passcode" });
            }
            if (passcode.length < 6 || passcode.length > 6) {
                return res.status(400).send({ status: false, msg: "required passcode length is 6" });
            }
        }
        if (!new_passcode) {
            return res.status(400).send({ status: false, msg: "Plz enter valid new passcode" });
        }
        if (!confirm_new_passcode) {
            return res.status(400).send({ status: false, msg: "Plz enter valid confirm passcode" });
        }
        if (new_passcode !== confirm_new_passcode) {
            return res.status(400).send({ status: false, msg: "Plz enter the same passcode" });
        }
        const updatedUser = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { name: name, email: email, mobile: mobile, passcode: new_passcode, confirm_passcode: new_passcode } }, { new: true });
        return res.status(200).send({ status: true, msg: 'successfully updated', data: updatedUser });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.updateUser = updateUser;
const getUser = async (req, res) => {
    try {
        let userId = req?.params?.userId;
        if (!val.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "userId is invalid" });
        }
        const findUser = await userModel_1.default.findOne({ _id: userId }, { isDeleted: false });
        if (!findUser) {
            return res.status(404).send({ status: false, msg: "user not found" });
        }
        return res.status(200).send({ status: true, msg: "user found", data: findUser });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.getUser = getUser;
const forgotPassode = async (req, res) => {
    try {
        const mobile = req.body.mobile;
        if (!val.isValidPhone(mobile)) {
            return res.status(400).send({ status: false, msg: "valid phone number is required" });
        }
        const findUser = await userModel_1.default.findOne({ mobile: mobile }, { isDeleted: false });
        if (!findUser) {
            return res.status(404).send({ status: false, msg: "user not found" });
        }
        const otp = (0, util_1.GenerateOtp)();
        findUser.otp = "";
        await findUser.save();
        return res.status(200).send({ status: true, msg: "otp sent successfully", data: findUser._id, otp });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.forgotPassode = forgotPassode;
const verifyOtp = async (req, res) => {
    try {
        const userId = req.body.userId;
        const otp = req.body.otp;
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "user not found" });
        }
        if (otp !== user.otp) {
            return res.status(400).send({ status: false, message: "incorrect otp" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, 'Rushi-159', { expiresIn: "12h" });
        return res.status(201).json({ type: "successfully logged in", message: "OTP verified successfully", data: { userId: user._id, token, },
        });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.verifyOtp = verifyOtp;
