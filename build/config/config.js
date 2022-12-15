"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connects = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connects = () => {
    return (0, mongoose_1.connect)("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/rushikesh9075-DB?authSource=admin&replicaSet=atlas-9zusex-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
        .then(() => {
        console.log("DB is connected");
    }).catch((error) => {
        console.log(error);
    });
};
exports.connects = connects;
