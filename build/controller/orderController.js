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
exports.getUserOrders = exports.getOrderById = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const val = __importStar(require("../validation/validation"));
const createOrder = async (req, res) => {
    try {
        let data = req.body;
        const userId = req.body.userId;
        const { orderItems } = data;
        if (!val.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "please provide valid id" });
        }
        if (orderItems && orderItems.length === 0) {
            return res.status(400).send({ status: false, msg: "no items found" });
        }
        const createdOrder = await orderModel_1.default.create(data);
        return res.status(201).send({ status: true, data: createdOrder });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
exports.createOrder = createOrder;
const getOrderById = async (req, res) => {
    try {
        let orderId = req.params.orderId;
        const findOrder = await orderModel_1.default.findOne({ _id: orderId }, { isDeleted: false });
        if (!findOrder) {
            return res.status(404).send({ status: false, message: "order not found" });
        }
        return res.status(200).send({ status: true, msg: "order fetch successfully", data: findOrder });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
exports.getOrderById = getOrderById;
const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!val.isValidObjectId) {
            return res.status(400).send({ status: false, msg: "please provide correct id" });
        }
        const findUser = await userModel_1.default.findOne({ _id: userId }, { isDeleted: false });
        if (!findUser) {
            return res.status(404).send({ status: false, message: "user not found" });
        }
        const findOrder = await orderModel_1.default.findOne({ userId: userId });
        if (!findOrder) {
            return res.status(404).send({ status: false, message: "order not found" });
        }
        return res.status(200).send({ status: true, message: "orders", data: findOrder });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
exports.getUserOrders = getUserOrders;
