"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    passcode: {
        type: Number,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
    image: {
        type: String,
    },
    confirm_passcode: {
        type: Number,
        required: true
    }
});
const UserModel = (0, mongoose_1.model)('users', userSchema);
exports.default = UserModel;
