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
exports.getAllRestro = exports.getRestaurantById = exports.addRestaurant = void 0;
const restaurantModel_1 = __importDefault(require("../models/restaurantModel"));
const val = __importStar(require("../validation/validation"));
const addRestaurant = async (req, res) => {
    try {
        let data = req.body;
        const { name, description, address, mobile, reviews, rating, numReviews } = data;
        if (!name || !description || !address || !mobile || !reviews || !rating || !numReviews) {
            return res.status(400).send({ status: false, msg: "this field is required" });
        }
        const restrofind = await restaurantModel_1.default.find({ name: name });
        if (restrofind.length > 0) {
            return res.status(400).send({ status: true, msg: "restro is already in list" });
        }
        let savedData = await restaurantModel_1.default.create(data);
        return res.status(201).send({ status: true, msg: "Restaurant created successfully", data: savedData
        });
    }
    catch (error) {
        return res.status(400).send({ status: false, msg: error.message });
    }
};
exports.addRestaurant = addRestaurant;
const getRestaurantById = async (req, res) => {
    try {
        let restroId = req?.params?.restroId.trim();
        if (!val.isValidObjectId(restroId)) {
            return res.status(400).send({ status: false, msg: "path param is invalid" });
        }
        const findRestro = await restaurantModel_1.default.findOne({ _id: restroId, isDeleted: false });
        if (!findRestro) {
            return res.status(404).send({ status: false, msg: "could not found" });
        }
        return res.status(200).send({ status: true, msg: "Restro found", data: findRestro });
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};
exports.getRestaurantById = getRestaurantById;
const getAllRestro = async (req, res) => {
    try {
        let findAllRestro = await restaurantModel_1.default.find({ isDeleted: false });
        if (!findAllRestro) {
            return res.status(404).send({ status: false, msg: "restaurant is not found" });
        }
        return res.status(200).send({ status: true, message: "List of all Restro", data: findAllRestro });
    }
    catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
};
exports.getAllRestro = getAllRestro;
