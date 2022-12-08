"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategory = exports.createCategory = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const createCategory = async (req, res) => {
    try {
        const data = req.body;
        const { name, image } = data;
        if (!name || !image) {
            return res.status(400).send({ status: false, message: "field is required" });
        }
        const dupliName = await categoryModel_1.default.find({ name: name });
        if (dupliName.length > 0) {
            return res.status(400).send({ status: false, message: "name is already in category" });
        }
        const createdCategory = await categoryModel_1.default.create(data);
        return res.status(201).send({ status: true, message: "created category", data: createdCategory });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.createCategory = createCategory;
const getCategory = async (req, res) => {
    try {
        const categoryFind = await categoryModel_1.default.find({ isDeleted: false });
        if (!categoryFind) {
            return res.status(404).send({ status: false, msg: "not found" });
        }
        return res.status(200).send({ status: false, msg: "list of category", data: categoryFind });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.getCategory = getCategory;
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const findCategory = await categoryModel_1.default.findOneAndDelete({ _id: categoryId }, { new: true });
        if (!findCategory) {
            return res.status(404).send({ status: false, mesaage: "not found or already deleted" });
        }
        return res.status(200).send({ status: true, mesaage: "successfully deleted", data: findCategory });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.deleteCategory = deleteCategory;
