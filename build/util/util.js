"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtp = exports.GenerateOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)("ACa081f7c439435784fdc54fdeee9c2060", "dbbbfaed0327d2b83732823ad9559c72");
const GenerateOtp = () => {
    const otp = Math.floor(10000 + Math.random() * 900000);
    return otp;
};
exports.GenerateOtp = GenerateOtp;
const getOtp = async (otp, mobile) => {
    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: `+91${mobile}`,
        from: '+16075588497'
    });
    return response;
};
exports.getOtp = getOtp;
