"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPincode = exports.isValidObjectId = exports.isValidPasscode = exports.isValidEmail = exports.isValidPhone = exports.isValid = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null)
        return false;
    if (typeof value === 'string' && value.trim().length === 0)
        return false;
    return true;
};
exports.isValid = isValid;
const isValidPhone = (mobile) => {
    const phone = /^[6-9]\d{9}$/;
    return phone.test(mobile);
};
exports.isValidPhone = isValidPhone;
const isValidEmail = (email) => {
    const mail = /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/;
    return mail.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPasscode = (passcode) => {
    const pass = /[0-9]/;
    return pass.test(passcode);
};
exports.isValidPasscode = isValidPasscode;
const isValidObjectId = (objectId) => {
    return mongoose_1.default.Types.ObjectId.isValid(objectId);
};
exports.isValidObjectId = isValidObjectId;
const isValidPincode = (pincode) => {
    const pin = /^[1-9][0-9]{5}$/;
    return pin.test(pincode);
};
exports.isValidPincode = isValidPincode;
