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
exports.deleteFood = exports.getFood = exports.getListOfFood = exports.getFoodByRestro = exports.addingFood = void 0;
const val = __importStar(require("../validation/validation"));
const foodModel_1 = __importDefault(require("../models/foodModel"));
const addingFood = async (req, res) => {
    try {
        const data = req.body;
        const { name, category, restaurant, description, price, reviews, rating } = data;
        if (!name || !category || !restaurant || !description || !price || !reviews || !rating) {
            return res.status(400).send({ status: false, msg: "this field is required" });
        }
        const foodFound = await foodModel_1.default.find({ name: name });
        if (foodFound.length > 0) {
            return res.status(400).send({ status: false, msg: "food name is already exist" });
        }
        let savedData = await foodModel_1.default.create(data);
        return res.status(201).send({ status: true, msg: "food added successfully", data: savedData
        });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};
exports.addingFood = addingFood;
const getFoodByRestro = async (req, res) => {
    try {
        const foodId = req?.params?.foodId;
        if (!val.isValidObjectId(foodId)) {
            return res.status(400).send({ status: false, msg: "id is invalid" });
        }
        const foodFind = await foodModel_1.default.findOne({ _id: foodId }, { isDeleted: false });
        if (!foodFind) {
            return res.status(404).send({ status: false, msg: "food not found" });
        }
        return res.status(200).send({ status: true, msg: "food found", data: foodFind });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.getFoodByRestro = getFoodByRestro;
const getListOfFood = async (req, res) => {
    try {
        const foodList = await foodModel_1.default.find({ isDeleted: false });
        if (!foodList) {
            return res.status(404).send({ status: false, msg: "food not found" });
        }
        return res.status(200).send({ status: true, msg: "food list", data: foodList });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.getListOfFood = getListOfFood;
const getFood = async (req, res) => {
    try {
        const restroId = req?.params?.restroId;
        const food = await foodModel_1.default.find({ restaurant: restroId }, { isDeleted: false });
        if (!food) {
            return res.status(404).send({ status: false, msg: "not found" });
        }
        return res.status(200).send({ status: true, msg: "food found", data: food });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.getFood = getFood;
const deleteFood = async (req, res) => {
    try {
        const foodId = req?.params?.foodId;
        if (!val.isValidObjectId(foodId)) {
            return res.status(400).send({ status: false, msg: "id is invalid" });
        }
        const foodFound = await foodModel_1.default.findOneAndDelete({ _id: foodId }, { new: true });
        if (!foodFound) {
            return res.status(404).send({ status: false, msg: "food not found or already deleted" });
        }
        return res.status(200).send({ status: true, msg: "food deleted successfully" });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};
exports.deleteFood = deleteFood;
