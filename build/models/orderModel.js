"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const orderSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            food: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: true,
                ref: "food",
            },
        },
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true }
    },
    deliveryCharge: {
        type: Number,
        default: 0.0,
    },
    packingCharge: {
        type: Number,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_2.model)('Order', orderSchema);
exports.default = OrderModel;
